import express from 'express'
import * as db from '../db/db'

export const stats = {
	balance: (req: express.Request, res: express.Response) => {
		res.end('balance');
	},
	investorsAmount: (req: express.Request, res: express.Response) => {
		res.end('investors amount');
	},
	investorsToday: (req: express.Request, res: express.Response) => {
		res.end('investors today');
	}
}

export const investors = {
	all: (req: express.Request, res: express.Response) => {
		db.getInvestors()
			.then((investors) => {
				res.header('StatusCode', '200');
				res.header('Content-Type', 'application/json');
				res.end(investors);
			})
			.catch(() => {
				res.header('StatusCode', '500');
				res.end();
			});
	},
	investor: (req: express.Request, res: express.Response) => {
		const username = req.query.username;
		db.getInvestor(username)
			.then((investor) => {
				res.header('StatusCode', '200');
				res.header('Content-Type', 'application/json');
				res.end(investor);
			})
			.catch(() => {
				res.header('StatusCode', '500');
				res.end();
			});
	}
}