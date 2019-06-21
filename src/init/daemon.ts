import * as api from 'telegraf'

export default class Daemon {
    public static async init(bot: api.Telegraf<api.ContextMessageUpdate>): Promise<void> {
        // ...
    }
}