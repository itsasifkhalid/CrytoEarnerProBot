import * as api from 'telegraf'
import MenuMessage from '../controllers/menu'

export default class Start {
    public static init(bot: api.Telegraf<api.ContextMessageUpdate>) {
        bot.start(async (ctx: api.ContextMessageUpdate) => {
            await MenuMessage.send(ctx)
        })
    }
}