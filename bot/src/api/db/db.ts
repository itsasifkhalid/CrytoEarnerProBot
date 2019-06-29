import argon2 from 'argon2'
import Investor, { IInvestor, investorStatus, investmentStatus } from '../../models/investor'
import ExpectedInvestment, { IExpectedInvestment } from '../../models/expectedInvestment'
import Admin, { IAdmin } from '../../models/admin'

export const stats = {
	async getAll(): Promise<string> {
		try {
			let data = JSON.parse(await investors.getInvestors());
			let balance = 0;
			let amount = data.length;
			data.forEach((investor) => {
				balance += investor.balance;
			});
			data = await Investor.find({ date: { $gt: (new Date()).getTime() - 8.64e7 } });
			let amountToday = data.length;
			return JSON.stringify({
				balance,
				amount,
				amountToday
			});
		} catch (err) {
			throw err;
		}
	},
	async getBalance(): Promise<string> {
		try {
			const data = JSON.parse(await investors.getInvestors());
			let balance = 0;
			data.forEach((investor) => {
				balance += investor.balance;
			});
			return JSON.stringify({ balance });
		} catch (err) {
			throw err;
		}
	},
	async getInvestorsAmount(): Promise<string> {
		try {
			const data = JSON.parse(await investors.getInvestors());
			return JSON.stringify({ amount: data.length });
		} catch (err) {
			throw err;
		}
	},
	async getInvestorsAmountToday(): Promise<string> {
		try {
			const data = await Investor.find({ date: { $gt: (new Date()).getTime() - 8.64e7 } });
			return JSON.stringify({ amount: data.length });
		} catch (err) {
			throw err;
		}
	} 
}

export const investors = {
	async getInvestors(): Promise<string> {
		try {
			const data = await Investor.find({});
			const investors = [];
			data.forEach((investor) => {
				const obj = {
					username: investor.username,
					fullName: investor.fullName,
					status: investorStatus[investor.status],
					balance: investor.balance,
					investments: investor.investments
				};
				obj.investments.forEach((item, index) => {
					obj.investments[index].status = investmentStatus[obj.investments[index].status];
				});
				investors.push(obj);
			});

			return JSON.stringify(investors);
		} catch (err) {
			throw err;
		}
	},
	async getInvestor(username: string): Promise<string> {
		try {
			const data = await Investor.findOne({ username });
			const investor = !data ? {} : {
				username: data.username,
				fullName: data.fullName,
				status: investorStatus[data.status],
				balance: data.balance,
				investments: data.investments
			}
			if (investor.investments) {
				investor.investments.forEach((item, index) => {
					investor.investments[index].status = investmentStatus[investor.investments[index].status];
				});
			}

			return JSON.stringify(investor);
		} catch (err) {
			throw err;
		}
	},
	async setInvestorStatus(username: string, status: string): Promise<void> {
		if (!username || !status) { throw new Error(); }
		if (!(status in investorStatus)) { throw new Error(); }
		try {
			if (investorStatus[status] !== investorStatus.BLOCKED) {
				await Investor.updateOne({ username }, { $set: { status: investorStatus[status] } });
				return;	
			}
			const data = await Investor.findOne({ username });
			if (!data) { return; }
			data.status = investorStatus.BLOCKED;
			if (data.investments) {
				data.investments.forEach((item, index) => {
					data.investments[index].status = investmentStatus.CANCELED;
				});
			}
			await Investor.updateOne({ username }, data);
		} catch (err) {
			throw err;
		}
	}
}

export const investments = {
	async setInvestmentStatus(username: string, id: string, status: string): Promise<void> {
		if (!username || !id || !status) { throw new Error(); }
		if (!(status in investmentStatus)) { throw new Error(); }
		try {
			const data = await Investor.findOne({ username });
			if (!data || !data.investments) { return; }
			let flag: boolean = false;
			data.investments.forEach((item, index) => {
				if (item.id === id) {
					data.investments[index].status = investmentStatus[status];
					flag = true;
				}
			});
			if (!flag) { return; }
			await Investor.updateOne({ username }, data);
		} catch (err) {
			throw err;
		}
	},
	async setInvestmentNote(username: string, id: string, note: string): Promise<void> {
		if (!username || note === undefined) { throw new Error(); }
		try {
			const data = await Investor.findOne({ username });
			if (!data || !data.investments) { return; }
			let flag: boolean = false;
			data.investments.forEach((item, index) => {
				if (item.id === id) {
					data.investments[index].note = note;
					flag = true;
				}
			});
			if (!flag) { return; }
			await Investor.updateOne({ username }, data);
		} catch (err) {
			throw err;
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
			throw err;
		}
	},
	async changePassword(username: string, password: string): Promise<void> {
		if (!username || !password) { throw new Error(); }
		const data = await Admin.findOne({ username });
		if (!data) { return; }
		try {
			data.password = await argon2.hash(password);
			await Admin.updateOne({ username }, data);
		}
		 catch (err) {
			throw err;
		}
	}
}