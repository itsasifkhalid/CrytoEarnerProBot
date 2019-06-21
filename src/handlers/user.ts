import * as api from 'telegraf'
import InvestMessage from '../controllers/userInvest'

export default class User {
    public static init(bot: api.Telegraf<api.ContextMessageUpdate>) {
        bot.hears('Инвестировать', async (ctx: any) => {
            await InvestMessage.send(ctx)
        })
    }
}