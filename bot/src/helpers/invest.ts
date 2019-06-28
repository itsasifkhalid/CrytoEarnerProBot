import * as api from 'telegraf'
import Logger from '../init/logger'
import Investor, { investorStatus, investmentStatus } from '../models/investor'
import ExpectedInvestment from '../models/expectedInvestment'

export async function addInvestor(chatId: number, username: string, fullName: string): Promise<void> {
    // Получаем данные о пользователе из контекста
    let status = investorStatus.ACTIVE;
    let balance = 0;

    // Создаём нового инвестора
    let investor = new Investor({
        chatId,
        username,
        fullName,
        status,
        balance,
        date: new Date()
    })

    // Сохраняем его
    await investor.save((err) => {
        if (!err) {
            Logger.notify(`Добавлен новый инвестор: @${username}!`)
        }
    })
}

export async function addInvestment(id: string, chatId: number): Promise<void> {
	let expectedInvestment = new ExpectedInvestment({
		id,
		chatId
	})

	await expectedInvestment.save((err) => {
		if (!err) {
			Logger.notify(`Добавлена новая инвестиция: ${id}!`)	
		}
	})
}

export async function activeInvestment(id: string, sum: number): Promise<void> {
    try {
        const investment = await ExpectedInvestment.findOne({ id });
        if (!investment) { return; }
        const { chatId } = investment;
        await ExpectedInvestment.deleteOne({ id });
        const investor = await Investor.findOne({ chatId });
        if (!investor) { return; }
        const newInvestment = {
            id,
            date: new Date(),
            expires: new Date((new Date()).getTime() + 6.048e8),
            sum,
            status: investmentStatus.ACTIVE,
            note: ''
        };
        if (!investor.investments) {
            investor.investments = [newInvestment];
            return;
        }
        investor.investments.push(newInvestment);
    } catch (err) {
        throw err;
    }
}

export async function checkTransaction(transactionSuccess: (chatId: number, balance: number) => void): Promise<void> {
    // проверяем новые транзакции
    // если транзакция пришла:
    // 1. вызываем activeInvestment(id, sum)
    // 2. получаем текущий баланс у инвестора
    // 3. вызываем transactionSuccess(chatId, balance)
}