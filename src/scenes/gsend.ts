import Logger from '../init/logger'
import { sendGlobal } from '../helpers/functions'
import AdminMessage from '../controllers/admin'

// Немного модулей без типов ES5
const Markup = require('telegraf/markup')
const WizardScene = require('telegraf/scenes/wizard')

/**
 * Сцена рассылки
 */
export default new WizardScene(
    'gsend',
    // Запрашиваем сообщение
    async (ctx: any) => {
        let keyboard = Markup.keyboard([
            Markup.button('Назад')
        ]).oneTime().resize().extra()

        await ctx.replyWithMarkdown('Введите сообщение для рассылки\n\nПри форматировании используйте *два знака разметки* вместо одного', keyboard)
        return ctx.wizard.next()
    },
    // Финальное действие
    async (ctx: any) => {
        if (ctx.message.text === 'Назад') {
            await AdminMessage.send(ctx)
            return ctx.scene.leave()
        }
        
        try {
            await sendGlobal(ctx)
            await ctx.reply('Рассылка успешно проведена! 🎉', AdminMessage.keyboard)
            Logger.notify(`Рассылка успешно проведена! 🎉 Админ: @${ctx.from.username}; Сообщение: "${ctx.message.text}"`)
        } catch (err) {
            await ctx.reply('Не удалось выполнить рассылку, приносим извинения', AdminMessage.keyboard)
            Logger.error(err.message)
        }
        return ctx.scene.leave()
    }
)