import * as api from 'telegraf'
import { randomString } from '../helpers/functions'

export default class User {
    public static init(bot: api.Telegraf<api.ContextMessageUpdate>) {
        bot.hears('Инвестировать', async (ctx: any) => {
        	const str: string = randomString(24);
        	console.log(str);
        })
    }
}