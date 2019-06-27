import express from 'express'
import * as db from '../db/db'
import { addInvestment } from '../../helpers/invest'

export const stats = {
	async all(req: express.Request, res: express.Response): Promise<void> {
		if (!req.session.authorized) {
			res.status(401).end(JSON.stringify({}));
			return;
		}
		try {
			const all = await db.stats.getAll();
			res.header('Content-Type', 'application/json');
			res.status(200).end(all);
		} catch (err) {
			res.status(500).end('Error: Internal server error');
		}
	},
	async balance(req: express.Request, res: express.Response): Promise<void> {
		if (!req.session.authorized) {
			res.status(401).end(JSON.stringify({}));
			return;
		}
		try {
			const balance = await db.stats.getBalance();
			res.header('Content-Type', 'application/json');
			res.status(200).end(balance);
		} catch (err) {
			res.status(500).end('Error: Internal server error');
		}
	},
	async investorsAmount(req: express.Request, res: express.Response): Promise<void> {
		if (!req.session.authorized) {
			res.status(401).end(JSON.stringify({}));
			return;
		}
		try {
			const amount = await db.stats.getInvestorsAmount();
			res.header('Content-Type', 'application/json');
			res.status(200).end(amount);
		} catch (err) {
			res.status(500).end('Error: Internal server error');
		}
	},
	async investorsToday(req: express.Request, res: express.Response): Promise<void> {
		if (!req.session.authorized) {
			res.status(401).end(JSON.stringify({}));
			return;
		}
		try {
			const amountToday = await db.stats.getInvestorsAmountToday();
			res.header('Content-Type', 'application/json');
			res.status(200).end(amountToday);
		} catch (err) {
			res.status(500).end('Error: Internal server error');
		}
	}
}

export const investors = {
	async all(req: express.Request, res: express.Response): Promise<void> {
		if (!req.session.authorized) {
			res.status(401).end(JSON.stringify({}));
			return;
		}
		try {
			const investors = await db.investors.getInvestors();
			res.header('Content-Type', 'application/json');
			res.status(200).end(investors);
		} catch (err) {
			res.status(500).end('Error: Internal server error');
		}
	},
	async investor(req: express.Request, res: express.Response): Promise<void> {
		if (!req.session.authorized) {
			res.status(401).end(JSON.stringify({}));
			return;
		}
		const { username } = req.query;
		try {
			const investor = await db.investors.getInvestor(username);			
			res.header('Content-Type', 'application/json');
			res.status(200).end(investor);
		} catch (err) {
			res.status(500).end('Error: Internal server error');
		}
	},
	async setInvestorStatus(req: express.Request, res: express.Response): Promise<void> {
		if (!req.session.authorized) {
			res.status(401).end(JSON.stringify({}));
			return;
		}
		let { username, status } = req.body;
		status = status.toUpperCase();
		try {
			await db.investors.setInvestorStatus(username, status);
			res.status(200).end(JSON.stringify({}));
		} catch (err) {
			res.status(500).end('Error: Internal server error');
		}
	},
}

export const investments = {
	async addInvestment(req: express.Request, res: express.Response): Promise<void> {
		const { id, chatId } = req.query;
		await addInvestment(id, chatId);
	},
	async setInvestmentStatus(req: express.Request, res: express.Response): Promise<void> {
		if (!req.session.authorized) {
			res.status(401).end(JSON.stringify({}));
			return;
		}
		let { username, id, status } = req.body;
		status = status.toUpperCase();
		try {
			await db.investments.setInvestmentStatus(username, id, status);
			res.status(200).end(JSON.stringify({}));
		} catch (err) {
			res.status(500).end('Error: Internal server error');
		}
	},
	async setInvestmentNote(req: express.Request, res: express.Response): Promise<void> {
		if (!req.session.authorized) {
			res.status(401).end(JSON.stringify({}));
			return;
		}
		let { username, id, note } = req.body;
		try {
			await db.investments.setInvestmentNote(username, id, note);
			res.status(200).end(JSON.stringify({}));
		} catch (err) {
			res.status(500).end('Error: Internal server error');
		}
	}
}

export const auth = {
	check(req: express.Request, res: express.Response): void {
		if (!req.session.authorized) {
			res.status(401).end(JSON.stringify({}));
			return;
		}
		res.status(200).end(JSON.stringify({}));
	},
	async signIn(req: express.Request, res: express.Response): Promise<void> {
		const { username, password } = req.body;
		try {
			const isAdmin = await db.admins.checkAdmin(username, password);
			
			if (isAdmin) {
				req.session.authorized = true;
				req.session.username = username;

				res.status(200).end(JSON.stringify({}));
			} else {
				res.status(401).end(JSON.stringify({}));
			}
		} catch (err) {
			res.status(500).end('Error: Internal server error');
		}
	},
	async signOut(req: express.Request, res: express.Response): Promise<void> {
		delete req.session.authorized;
		delete req.session.username;
		res.status(200).end(JSON.stringify({}));
	}
}
