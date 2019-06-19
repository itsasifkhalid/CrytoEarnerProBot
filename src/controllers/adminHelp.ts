import * as api from 'telegraf'
import AdminMessage from './admin'
import * as texts from '../texts.json'

const Markup = require('telegraf/markup')

export default class AdminsHelpMessage {
    public static async send(ctx: api.ContextMessageUpdate): Promise<void> {
        await ctx.replyWithMarkdown(texts.adminHelp, AdminMessage.keyboard)
    }
}