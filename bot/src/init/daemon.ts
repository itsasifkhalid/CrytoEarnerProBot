import * as api from 'telegraf'
import IConfig from '../interfaces/IConfig'
import Logger from './logger'
import ExpectedInvestment from '../models/expectedInvestment'
import Investor, { investmentStatus } from '../models/investor'
import { getTransactions } from '../helpers/requests'
import { activeInvestment, payInvestment } from '../helpers/invest'

// Config
const config: IConfig = require('../../config/config.json');

export default class Daemon {
	public static newTransactionsInterval: number = 10e3; // 10 секунд
	//public static newTransactionsInterval: number = 6e5; // 10 минут
	public static expiredInvestmentsInterval: number = 1.8e6; // 30 минут
	public static failedStatuses: string[] = ['InProcessing', 'Pending', 'Expired', 'Refunded', 'Declined', 'RefundInProcessing'];
	
	public static async init(bot: api.Telegraf<api.ContextMessageUpdate>): Promise<void> {
		const transactionSuccess = (chatId: number, balance: number) => {
			const successMessage = `Транзакция успешна. Ваш текущий баланс: ${balance} UAH.`;
			bot.telegram.sendMessage(chatId, successMessage);
		}

		const checkNewTransactions = async function(): Promise<void> {
			const { merchantAccount } = process.env.NODE_ENV === 'production' ? config.prod.way4pay : config.dev.way4pay;
			const dateBegin = (new Date()).getTime() - 8.64e7; // Начальная дата: сутки назад
			const dateEnd = (new Date()).getTime(); // Конечная дата: сейчас

			try {
				const transactionList = await getTransactions(merchantAccount, dateBegin, dateEnd); // Получаем массив транзакций
				if (!transactionList) { return; } // Массив отсутствует
				for (let i = 0; i < transactionList.length; i++) { // Для каждой транзакции
					if (Daemon.failedStatuses.includes(transactionList[i].transactionStatus)) {
						return; // Транзакция имеет неактуальный статус
					}
					// Активируем инвестицию
					const { chatId, balance } = await activeInvestment(transactionList[i].orderReference, transactionList[i].amount);
					transactionSuccess(chatId, balance);
				}
			} catch (err) {
				Logger.fatal(`XXX Возникла ошибка! Текст ошибки: \n${err.message}`);
			}
		}

		const checkExpiredInvestments = async function(): Promise<void> {
			const now = new Date();
			const investors = await Investor.find({});
			try {
				for (let i = 0; i < investors.length; i++) {
					const { investments } = investors[i];
					for (let j = 0; j < investments.length; j++) {
						if (investments[j].expires > now || investments[j].status !== investmentStatus.ACTIVE) { return; }
						await payInvestment(investments[j].id, investors[i].chatId);						
					}
				}
			} catch (err) {
				Logger.fatal(`XXX Возникла ошибка! Текст ошибки: \n${err.message}`);
			}
		}

		setInterval(checkNewTransactions, this.newTransactionsInterval); // Проверяем новые транзакции раз в заданный интервал
		setInterval(checkExpiredInvestments, this.expiredInvestmentsInterval); // Проверяем истекшие инвестиции раз в заданный интервал
	}
}