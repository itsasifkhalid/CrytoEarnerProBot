import Investor, { IInvestor, investorStatus, investmentStatus } from '../../models/investor'
import ExpectedInvestment, { IExpectedInvestment } from '../../models/expectedInvestment'

export function getInvestors(): Promise<string> {
	return new Promise((resolve, reject) => {
		Investor.find({}, (err, data) => {
			if (err) {
				reject();
			}
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

			resolve(JSON.stringify(investors));
		})
	});
}

export function getInvestor(username: string): Promise<string> {
	return new Promise((resolve, reject) => {
		Investor.findOne({ username }, (err, data) => {
			if (err) {
				reject();
			}
			const investor = !data ? {} : {
				username: data.username,
				fullName: data.fullName,
				status: data.status,
				balance: data.balance,
				investments: data.investments
			}

			resolve(JSON.stringify(investor));
		})
	});	
}