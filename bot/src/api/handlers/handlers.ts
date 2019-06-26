import express from 'express'
import * as db from '../db/db'
import { addInvestment } from '../../helpers/invest'

export const stats = {
	async all(req: express.Request, res: express.Response): Promise<void> {
		if (!req.session.authorized) {
			res.header('StatusCode', '401');
			res.end(JSON.stringify({}));
			return;
		}
		try {
			const all = await db.stats.getAll();
			res.header('StatusCode', '200');
			res.header('Content-Type', 'application/json');
			res.end(all);
		} catch (err) {
			res.header('StatusCode', '500');
			res.end('Error: Internal server error');
		}
	},
	async balance(req: express.Request, res: express.Response): Promise<void> {
		if (!req.session.authorized) {
			res.header('StatusCode', '401');
			res.end(JSON.stringify({}));
			return;
		}
		try {
			const balance = await db.stats.getBalance();
			res.header('StatusCode', '200');
			res.header('Content-Type', 'application/json');
			res.end(balance);
		} catch (err) {
			res.header('StatusCode', '500');
			res.end('Error: Internal server error');
		}
	},
	async investorsAmount(req: express.Request, res: express.Response): Promise<void> {
		if (!req.session.authorized) {
			res.header('StatusCode', '401');
			res.end(JSON.stringify({}));
			return;
		}
		try {
			const amount = await db.stats.getInvestorsAmount();
			res.header('StatusCode', '200');
			res.header('Content-Type', 'application/json');
			res.end(amount);
		} catch (err) {
			res.header('StatusCode', '500');
			res.end('Error: Internal server error');
		}
	},
	async investorsToday(req: express.Request, res: express.Response): Promise<void> {
		if (!req.session.authorized) {
			res.header('StatusCode', '401');
			res.end(JSON.stringify({}));
			return;
		}
		try {
			const amountToday = await db.stats.getInvestorsAmountToday();
			res.header('StatusCode', '200');
			res.header('Content-Type', 'application/json');
			res.end(amountToday);
		} catch (err) {
			res.header('StatusCode', '500');
			res.end('Error: Internal server error');
		}
	}
}

export const investors = {
	async all(req: express.Request, res: express.Response): Promise<void> {
		if (!req.session.authorized) {
			res.header('StatusCode', '401');
			res.end(JSON.stringify({}));
			return;
		}
		try {
			const investors = await db.investors.getInvestors();
			res.header('StatusCode', '200');
			res.header('Content-Type', 'application/json');
			res.end(investors);
		} catch (err) {
			res.header('StatusCode', '500');
			res.end('Error: Internal server error');
		}
	},
	async investor(req: express.Request, res: express.Response): Promise<void> {
		if (!req.session.authorized) {
			res.header('StatusCode', '401');
			res.end(JSON.stringify({}));
			return;
		}
		const { username } = req.query;
		try {
			const investor = await db.investors.getInvestor(username);			
			res.header('StatusCode', '200');
			res.header('Content-Type', 'application/json');
			res.end(investor);
		} catch (err) {
			res.header('StatusCode', '500');
			res.end('Error: Internal server error');
		}
	},
	async addInvestment(req: express.Request, res: express.Response): Promise<void> {
		const { id, chatId } = req.query;
		addInvestment(id, chatId);
		res.header('StatusCode', '200')
		res.end(JSON.stringify({}));
	},
	async setInvestorStatus(req: express.Request, res: express.Response): Promise<void> {
		if (!req.session.authorized) {
			res.header('StatusCode', '401');
			res.end(JSON.stringify({}));
			return;
		}
		let { username, status } = req.body;
		status = status.toUpperCase();
		try {
			await db.investors.setInvestorStatus(username, status);
			res.header('StatusCode', '200');
			res.end(JSON.stringify({}));
		} catch (err) {
			res.header('StatusCode', '500');
			res.end('Error: Internal server error');
		}
	},
	async setInvestmentStatus(req: express.Request, res: express.Response): Promise<void> {
		if (!req.session.authorized) {
			res.header('StatusCode', '401');
			res.end(JSON.stringify({}));
			return;
		}
		let { username, id, status } = req.body;
		status = status.toUpperCase();
		try {
			await db.investors.setInvestmentStatus(username, id, status);
			res.header('StatusCode', '200');
			res.end(JSON.stringify({}));
		} catch (err) {
			res.header('StatusCode', '500');
			res.end('Error: Internal server error');
		}
	},
	async setInvestorStatus(req: express.Request, res: express.Response): Promise<void> {
		if (!req.session.authorized) {
			res.header('StatusCode', '401');
			res.end(JSON.stringify({}));
			return;
		}
		let { username, note } = req.body;
		try {
			await db.investors.setInvestorNote(username, status);
			res.header('StatusCode', '200');
			res.end(JSON.stringify({}));
		} catch (err) {
			res.header('StatusCode', '500');
			res.end('Error: Internal server error');
		}
	}
}

export const auth = {
	check(req: express.Request, res: express.Response): void {
		if (!req.session.authorized) {
			res.header('StatusCode', '401');
			res.end(JSON.stringify({}));
			return;
		}
		res.header('StatusCode', '200');
		res.end(JSON.stringify({}));
	},
	async signIn(req: express.Request, res: express.Response): Promise<void> {
		const { username, password } = req.body;
		try {
			const isAdmin = await db.admins.checkAdmin(username, password);
			
			if (isAdmin) {
				req.session.authorized = true;
				req.session.username = username;

				res.header('StatusCode', '200');
				res.end(JSON.stringify({}));
			} else {
				res.header('StatusCode', '401');
				res.end(JSON.stringify({}));
			}
		} catch (err) {
			res.header('StatusCode', '500');
			res.end('Error: Internal server error');
		}
	},
	async signOut(req: express.Request, res: express.Response): Promise<void> {
		delete req.session.authorized;
		delete req.session.username;
		res.header('StatusCode', '200');
		res.end(JSON.stringify({}));
	}
}