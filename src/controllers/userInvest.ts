import * as api from 'telegraf'
import Investor from '../models/investor'
import { randomString } from '../helpers/functions'

export default class InvestMessage {
	public static async send(ctx: api.ContextMessageUpdate): Promise<void> {
		const paymendId: string = randomString(24);
		console.log(paymendId);
	}
}