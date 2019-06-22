import Logger from '../init/logger'
import Investor, { investorStatus, investmentStatus } from '../models/investor'
import ExpectedInvestment from '../models/expectedInvestment'

export async function addInvestor(username: string, fullName: string): Promise<void> {
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

export async function addInvestment(paymendId: string, chatId: number): Promise<void> {
	let expectedInvestment = new ExpectedInvestment({
		id: paymendId,
		chatId: chatId
	})

	await expectedInvestment.save((err) => {
		if (!err) {
			Logger.notify(`Добавлена новая инвестиция: ${paymendId}!`)	
		}
	})
}