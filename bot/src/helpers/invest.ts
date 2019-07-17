import Logger from '../init/logger'
import IConfig from '../interfaces/IConfig'
import ExpectedInvestment from '../models/expectedInvestment'
import Investor, { investmentStatus, investorStatus } from '../models/investor'
import { refund } from './requests'

// Config
const config: IConfig = require('../../config/config.json')

export async function addInvestor(chatId: number, username: string, fullName: string): Promise<void> {
  let status = investorStatus.ACTIVE
  let balance = 0
  
  let investor = new Investor({ // Создаём нового инвестора
    chatId,
    username,
    fullName,
    status,
    balance,
    date: new Date()
  })
  
  await investor.save((err) => { // Сохраняем его
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
  const investment = await ExpectedInvestment.findOne({ id }) // Ищем в expectedInvestments
  if (!investment) { return }
  
  const { chatId } = investment // Берем chatId
  const investor = await Investor.findOne({ chatId }) // Ищем инвестора в investors
  if (!investor) { return }
  
  const { merchantAccount, percent } = process.env.NODE_ENV === 'production' ? config.prod.way4pay : config.dev.way4pay
  const refundAmount = amount / 100 * percent // Процент для выплаты инвестору
  await refund(merchantAccount, id, refundAmount) // Выплачиваем процент инвестору
  
  await ExpectedInvestment.deleteOne({ id }) // Удаляем из expectedInvestments
  const newInvestment = { // Создаем новую инвестицию
    id,
    date: new Date(),
    expires: new Date((new Date()).getTime() + 6.048e8),
    amount,
    status: investmentStatus.ACTIVE,
    note: ''
  }
  investor.investments.push(newInvestment) // Добавляем ее соответствующему инвестору
  
  investor.balance += amount // Увеличиваем баланс инвестора
  const { balance } = investor
  
  await investor.save() // Сохраняем инвестора
  
  Logger.notify(`Активирована новая инвестиция: ${id}!`)
  
  return { chatId, balance }
}

export async function payInvestment(id: string, chatId: number): Promise<void> {
  const investor = await Investor.findOne({ chatId }) // Ищем инвестора в investors
  const { investments } = investor
  for (let i = 0; i < investments.length; i++) {
    if (investments[i].id !== id) { continue }
    const { merchantAccount } = process.env.NODE_ENV === 'production' ? config.prod.way4pay : config.dev.way4pay
    const { amount } = investments[i]
    await refund(merchantAccount, id, amount) // Выплачиваем сумму инвестору
    investments[i].status = investmentStatus.CLOSED
    break
  }
  await investor.save()
}