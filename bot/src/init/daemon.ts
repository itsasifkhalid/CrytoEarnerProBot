import * as api from 'telegraf'
import crypto from 'crypto'
import ExpectedInvestment from '../models/expectedInvestment'
import Investor, { investmentStatus } from '../models/investor'
import request from '../helpers/request'
import { activeInvestment, payInvestment } from '../helpers/invest'

export default class Daemon {
	public static newTransactionsInterval: number = 10e3; // 10 секунд
	//public static newTransactionsInterval: number = 6e5; // 10 минут
	public static expiredInvestmentsInterval: number = 1.8e6; // 30 минут
	public static failedStatuses: string[] = ['InProcessing', 'Pending', 'Expired', 'Refunded', 'Declined', 'RefundInProcessing'];
	public static lastChecked: string;

	public static async init(bot: api.Telegraf<api.ContextMessageUpdate>): Promise<void> {
		const transactionSuccess = (chatId: number, balance: number) => {
			const successMessage = `Транзакция успешна. Ваш текущий баланс: ${balance} UAH.`;
			bot.telegram.sendMessage(chatId, successMessage);
		}

		const checkNewTransactions = async function(): Promise<void> {
			try {
				const merchantAccount = null;
				const dateBegin = (new Date()).getTime() - 8.64e7; // Начальная дата: сутки назад
				const dateEnd = (new Date()).getTime(); // Конечная дата: сейчас
				const hashStr = `${merchantAccount};${dateBegin};${dateEnd}`; // Строка для хеширования
				const merchantSignature = await crypto.createHash('md5').update(hashStr).digest('hex'); // MD5 хеш

				const data = await request({ // Получаем транзакции за последние сутки
					url: 'https://api.wayforpay.com/api',
					body: {
						transactionType: 'TRANSACTION_LIST',
						apiVersion: 1,
						merchantAccount,
						merchantSignature,
						dateBegin,
						dateEnd
					}, 
					json: true
				});
				console.dir(data);

				const transactionList = data['transactionList']; // Массив с транзакциями
				
				if (!transactionList) { return; } // Массив отсутствует
			
				transactionList.forEach(async (transaction) => { // Для каждой транзакции
					if (Daemon.failedStatuses.includes(transaction.transactionStatus)) { return; } // Транзакция имеет неактуальный статус
					try {
						const { chatId, balance } = await activeInvestment(transaction.orderReference, transaction.amount); // Активируем инвестиция
						transactionSuccess(chatId, balance);
					} catch (err) {
						console.error(`Error: ${err.message}`);
						return;
					}
				});
			} catch (err) {
				console.error(`Error: ${err.message}`);
			}
		}

		const checkExpiredInvestments = async function(): Promise<void> {
			const now = new Date();
			const data = await Investor.find({});
			data.forEach((investor) => {
				const { investments } = investor;
				investments.forEach(async (investment, index) => {
					if (investment.expires > now || investment.status !== investmentStatus.ACTIVE) { return; }
					await payInvestment(investment.id, investor.chatId);
				});
			});
		}

		setInterval(checkNewTransactions, this.newTransactionsInterval); // Проверяем новые транзакции раз в заданный интервал
		setInterval(checkExpiredInvestments, this.expiredInvestmentsInterval); // Проверяем истекшие инвестиции раз в заданный интервал
	}
}