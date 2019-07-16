import * as api from 'telegraf'
import Logger from '../init/logger'
import User, { IUser } from '../models/user'
import Investor from '../models/investor'

const { floor, random } = Math

export async function getUsers(): Promise<IUser[]> {
    return await User.find({})
}

export async function getAdmins(): Promise<IUser[]> {
    return await User.find({ isAdmin: true })
}

export async function isAdmin(chatId: number): Promise<Boolean> {
    let res = await User.find({ chatId: chatId, isAdmin: true })
    return res.length > 0
}

export async function sendGlobal(ctx: api.ContextMessageUpdate): Promise<void> {
    let users = await User.find({})

    for (const user of users) {
        if (user.chatId != ctx.from.id) {
            try {
                await ctx.telegram.sendCopy(user.chatId, ctx.message)
            } catch (err) {
                throw new Error(`Не удалось выполнить рассылку: ${err.message}`)
            }
        }
    }
}

export async function addAdmin(chatId: number): Promise<void> {
    try {
        let user = await User.findOne({ chatId: chatId })

        await user.set('isAdmin', true) // делаем юзера админом

        // Сохраняем его
        await user.save((err) => {
            if (!err)
                Logger.notify('Добавлен новый админ!')
        })
    } catch (err) {
        throw new Error(`Ошибка при добавлении админа: ${err.message}`)
    }
}

export async function dismissAdmin(chatId: number): Promise<void> {
    try {
        await User.updateOne({ chatId: chatId }, { isAdmin: false })
        Logger.notify('Админ успешно отстранён!')
    } catch (err) {
        throw new Error(`Ошибка при отстранении админа: ${err.message}`)
    }
}

export async function getBalance(username: string): Promise<number> {
    const data = await Investor.findOne({ username });
    if (!data) { return 0; }
    return data.balance;
}

export function randomString(size: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let str = ''
    for (let i = 0; i < size; i++) {
        str += chars.charAt(floor(random() * chars.length))
    }
    return str
}