import Logger from '../init/logger'
import { addAdmin } from '../helpers/functions'
import AdminMessage from '../controllers/admin'

// Немного модулей без типов ES5
const Markup = require('telegraf/markup')
const WizardScene = require('telegraf/scenes/wizard')

/**
 * Сцена добавления админов
 */
export default new WizardScene(
    'addAdmins',
    // Запрашиваем перечень chatId
    async (ctx: any) => {
        let keyboard = Markup.keyboard([
            Markup.button('Назад')
        ]).oneTime().resize().extra()

        await ctx.replyWithMarkdown('Перешлите мне сообщение от будущего админа ⏩\n*Он должен быть пользователем бота!*', keyboard)
        return ctx.wizard.next()
    },
    // Финальное действие
    async (ctx: any) => {
        if (ctx.message.text === 'Назад') {
            await AdminMessage.send(ctx)
            return ctx.scene.leave()
        }
        
        try {
            let adminId = ctx.message.forward_from.id
            console.log(ctx)
            console.log(adminId)
            
            await addAdmin(adminId)    // добавляем админов

            await ctx.reply('Операция прошла успешно! 🎉', AdminMessage.keyboard)
            Logger.notify(`Новый админ(${adminId}) добавлен! 🎉 Админ: @${ctx.from.username}`)
        } catch (err) {
            await ctx.reply('Не удалось добавить новых админов, приносим извинения.\nВозможно, Вы ввели некорректные данные', AdminMessage.keyboard)
            Logger.error(err.message)
        }
        return ctx.scene.leave()
    }
)