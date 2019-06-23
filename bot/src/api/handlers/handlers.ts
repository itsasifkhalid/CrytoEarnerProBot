import express from 'express'
import * as db from '../db/db'

export const stats = {
	async balance(req: express.Request, res: express.Response): Promise<void> {
		res.end('balance');
	},
	async investorsAmount(req: express.Request, res: express.Response): Promise<void> {
		res.end('investors amount');
	},
	async investorsToday(req: express.Request, res: express.Response): Promise<void> {
		res.end('investors today');
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
		const username = req.query.username;
		try {
			const investor = await db.investors.getInvestor(username);			
			res.header('StatusCode', '200');
			res.header('Content-Type', 'application/json');
			res.end(investor);
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