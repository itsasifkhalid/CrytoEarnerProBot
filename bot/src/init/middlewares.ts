import * as api from 'telegraf'
import addUsers from '../middlewares/addUsers'
import chatLogging from '../middlewares/chatLogging'
import Logger from './logger'

const session = require('telegraf/session')

export default class Middlewares {
    public static init(bot: api.Telegraf<api.ContextMessageUpdate>): void {
        try {
            bot.use(addUsers)       // прослойка добавления пользователя в базу
            bot.use(chatLogging)    // прослойка логирования переписки
            bot.use(session())      // прослойка для использования сессий

            Logger.trace('>>> Прослойки инициализированы')
        }
        catch {
            Logger.trace('XXX Произошла ошибка при инициализации прослоек!')
            process.exit(1)         // выход из приложения
        }
    }
}