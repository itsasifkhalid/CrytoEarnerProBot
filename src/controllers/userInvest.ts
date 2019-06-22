import * as api from 'telegraf'
import Logger from '../init/logger'
import Investor, { investorStatus, investmentStatus } from '../models/investor'
import ExpectedInvestment from '../models/expectedInvestment'
import { randomString } from '../helpers/functions'

export default class InvestMessage {
	public static async send(ctx: api.ContextMessageUpdate): Promise<void> {
		let username = ctx.from.username;
		let fullName = ctx.from.first_name;

		// Составляем имя в зависимости от наличия фамилии
		if (ctx.from.last_name !== undefined) {
			fullName = `${ctx.from.first_name} ${ctx.from.last_name}`
		}

		addInvestor(username, fullName);

		const paymendId: string = randomString(24);

		addInvestment(paymendId, username);

		// Вывод заготовленного текста с инфой куда присылать деньги + уникальный идентификатор платежа paymentId

		await ctx.reply('Функция в разработке')
	}
}

async function addInvestor(username: string, fullName: string): Promise<void> {
    // Получаем данные о пользователе из контекста
    let status = investorStatus.ACTIVE;
    let balance = 0;

    // Создаём нового инвестора
    let investor = new Investor({
        username: username,
        fullName: fullName,
        status: status,
        balance: balance
    })

    // Сохраняем его
    await investor.save((err) => {
        if (!err) {
            Logger.notify(`Добавлен новый инвестор: @${username}!`)
        }
    })
}

async function addInvestment(paymendId: string, username: string): Promise<void> {
	let expectedInvestment = new ExpectedInvestment({
		id: paymendId,
		username: username
	})

	await expectedInvestment.save((err) => {
		if (!err) {
			Logger.notify(`Добавлена новая инвестиция: ${paymendId} для @${username}!`)	
		}
	})
}