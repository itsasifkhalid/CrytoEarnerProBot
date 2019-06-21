import * as api from 'telegraf'

const Markup = require('telegraf/markup')

export default class ContactsMessage {
    public static keyboard = Markup.inlineKeyboard([
        Markup.urlButton('Наш сайт', 'https://telerobots.com.ua'),
        Markup.urlButton('Наш Telegram', 'https://t.me/vilkup')

    ]).oneTime().resize().extra()

    public static async send(ctx: api.ContextMessageUpdate): Promise<void> {
        await ctx.replyWithChatAction('typing')
        await ctx.reply('Вот наши контакты 👇\n\nСайт: https://telerobots.com.ua\nEmail: telerobotsua@gmail.com\nTelegram: @vilkup', this.keyboard)
    }
}