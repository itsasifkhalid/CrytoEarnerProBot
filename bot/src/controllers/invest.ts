import * as api from 'telegraf'
import Logger from '../init/logger'
import { randomString } from '../helpers/functions'
import { addInvestor, addInvestment } from '../helpers/invest'

export default class InvestMessage {
	public static async send(ctx: api.ContextMessageUpdate): Promise<void> {
		let chatId = ctx.from.id;
		let username = ctx.from.username;
		let fullName = ctx.from.first_name;

		// Составляем имя в зависимости от наличия фамилии
		if (ctx.from.last_name !== undefined) {
			fullName = `${ctx.from.first_name} ${ctx.from.last_name}`
		}

		addInvestor(chatId, username, fullName);

		const paymendId: string = randomString(24);

		addInvestment(paymendId, chatId);

		// Вывод заготовленного текста с инфой куда присылать деньги + уникальный идентификатор платежа paymentId

		await ctx.reply('Функция в разработке')
	}
}