import * as api from 'telegraf'

const Markup = require('telegraf/markup')

export default class MenuMessage {
    public static keyboard = Markup.keyboard([
        ['💼 Инвестировать', '💼 Условия'],
        ['💼 Баланс', '💼 Контакты']
    ]).oneTime().resize().extra()

    public static async send(ctx: api.ContextMessageUpdate): Promise<void> {
        await ctx.replyWithChatAction('typing')
        await ctx.reply('Добро пожаловать! ✌️\nС помощью этого бота Вы сможете делать быстрые инвестиции', this.keyboard)
    }
}