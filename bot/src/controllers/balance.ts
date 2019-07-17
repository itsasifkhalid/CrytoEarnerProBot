import * as api from 'telegraf'
import { getBalance } from '../helpers/functions'

const Markup = require('telegraf/markup')

export default class ContactsMessage {
  public static async send(ctx: api.ContextMessageUpdate): Promise<void> {
    await ctx.replyWithChatAction('typing')
    try {
      const balance = await getBalance(ctx.from.username)
      await ctx.reply(`Ваш текущий баланс: ${balance} UAH`)
    }
    catch (err) {
      await ctx.reply(`Ошибка при получении баланса. Повторите попытку позже`)
    }
  }
}