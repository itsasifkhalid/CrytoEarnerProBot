import * as api from 'telegraf'
import Admin from '../handlers/admin'
import CallbackQuery from '../handlers/callbackQuery'
import Start from '../handlers/start'
import User from '../handlers/user'
import Logger from './logger'

export default class Handlers {
    public static init(bot: api.Telegraf<api.ContextMessageUpdate>): void {
        try {
            Start.init(bot)         // Обработчик для /start
            User.init(bot)         // Обработчик для команд юзера
            Admin.init(bot)         // Обработчик для команд админа
            CallbackQuery.init(bot) // Обработчик для callback запросов

            Logger.trace('>>> Обработчики инициализированы')
        }
        catch {
            Logger.trace('XXX Произошла ошибка при инициализации обработчиков!')
            process.exit(1)        // выход из приложения
        }
    }
}
