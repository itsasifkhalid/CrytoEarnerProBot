import express from 'express'
import * as db from '../db/db'

export const stats = {
	async all(req: express.Request, res: express.Response): Promise<void> {
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
	async ban(req: express.Request, res: express.Response): Promise<void> {
		const { username } = req.body;
		try {
			await db.investors.banInvestor(username);
			res.header('StatusCode', '200');
			res.end();
		} catch (err) {
			res.header('StatusCode', '500');
			res.end('Error: Internal server error');
		}
	},
	async cancel(req: express.Request, res: express.Response): Promise<void> {
		const { username, id } = req.body;
		try {
			await db.investors.cancelInvestment(username, id);
			res.header('StatusCode', '200');
			res.end();
		} catch (err) {
			res.header('StatusCode', '500');
			res.end('Error: Internal server error');	
		}
	}
}

export const auth = {
	async signIn(req: express.Request, res: express.Response): Promise<void> {
		const { username, password } = req.body;
		try {
			const isAdmin = await db.admins.checkAdmin(username, password);
			
			if (isAdmin) {
				req.session.authorized = true;
				req.session.username = username;

				res.header('StatusCode', '200');
				res.end();
			} else {
				res.header('StatusCode', '401');
				res.end();
			}
		} catch (err) {
			res.header('StatusCode', '500');
			res.end('Error: Internal server error');
		}
	}	
}