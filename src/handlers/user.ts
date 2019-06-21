import * as api from 'telegraf'
import ContactsMessage from '../controllers/contacts'
import InvestMessage from '../controllers/userInvest'

export default class User {
    public static init(bot: api.Telegraf<api.ContextMessageUpdate>) {
        // TODO: Поменять эмоджи в параметрах
        bot.hears('💼 Инвестировать', async (ctx: any) => {
            await InvestMessage.send(ctx)
        })

        bot.hears('💼 Контакты', async (ctx: any) => {
            await ContactsMessage.send(ctx)
        })
    }
}