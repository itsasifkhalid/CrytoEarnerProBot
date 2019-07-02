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

export async function activeInvestment(id: string, amount: number): Promise<{ chatId: number, balance: number }> {
    try {
        const investment = await ExpectedInvestment.findOne({ id }); // Ищем в expectedInvestments
        if (!investment) { return; }
        const { chatId } = investment; // Берем chatId
        const investor = await Investor.findOne({ chatId }); // Ищем инвестора в investors
        if (!investor) { return; }
        await ExpectedInvestment.deleteOne({ id }); // Удаляем из expectedInvestments
        const newInvestment = { // Создаем новую инвестицию
            id,
            date: new Date(),
            expires: new Date((new Date()).getTime() + 6.048e8),
            amount,
            status: investmentStatus.ACTIVE,
            note: ''
        };
        /*if (!investor.investments) {
            investor.investments = [newInvestment];
            return;
        }*/
        investor.investments.push(newInvestment); // Добавляем ее соответствующему инвестору
        investor.balance += amount; // Увеличиваем баланс инвестора

        const { balance } = investor;

        await investor.save(); // Сохраняем инвестора

        Logger.notify(`Активирована новая инвестиция: ${id}!`) 
        
        return { chatId, balance };
    } catch (err) {
        throw err;
    }
}

export async function payInvestment(id: string, chatId: number): Promise<void> {
    try {
        const investor = await Investor.findOne({ chatId }); // Ищем инвестора в investors
        investor.investments.forEach((investment) => {
            if (investment.id !== id) { return; }
            // выплачиваем инвестицию обратно инвестору
            investment.status = investmentStatus.CLOSED;
        });
        await investor.save();
    } catch (err) {
        throw err;
    }
}