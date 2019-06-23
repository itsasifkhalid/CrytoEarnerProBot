import argon2 from 'argon2'
import Investor, { IInvestor, investorStatus, investmentStatus } from '../../models/investor'
import ExpectedInvestment, { IExpectedInvestment } from '../../models/expectedInvestment'
import Admin, { IAdmin } from '../../models/admin'

export const investors = {
	async getInvestors(): Promise<string> {
		try {
			const data = await Investor.find({});
			const investors = [];
			data.forEach((investor) => {
				investors.push({
					username: investor.username,
					fullName: investor.fullName,
					status: investor.status,
					balance: investor.balance,
					investments: investor.investments
				});
			});

			return JSON.stringify(investors);
		} catch (err) {
			throw new Error();
		}
	},
	async getInvestor(username: string): Promise<string> {
		try {
			const data = await Investor.findOne({ username });
			const investor = !data ? {} : {
				username: data.username,
				fullName: data.fullName,
				status: data.status,
				balance: data.balance,
				investments: data.investments
			}

			return JSON.stringify(investor);
		} catch (err) {
			throw new Error();
		}
	}
}

export const admins = {
	async checkAdmin(username: string, password: string): Promise<boolean> {
		if (!username || !password) { throw new Error(); }
		const data = await Admin.findOne({ username });
		if (!data) { return false; }
		try {
			return await argon2.verify(data.password, password);
		} catch (err) {
			throw new Error();
		}
	}
}