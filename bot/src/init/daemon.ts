import * as api from 'telegraf'
import { checkTransaction } from '../helpers/invest'

export default class Daemon {
    public static async init(bot: api.Telegraf<api.ContextMessageUpdate>): Promise<void> {
        const transactionSuccess = (chatId: number, balance: number) => {
        	const successMessage = `Транзакция успешна. Ваш текущий баланс: ${balance} UAH.`;
        	bot.telegram.sendMessage(chatId, successMessage);
        }

        setInterval(checkTransaction, 60e3, transactionSuccess); // Проверяем новые транзакции раз в 60 секунд
    }
}