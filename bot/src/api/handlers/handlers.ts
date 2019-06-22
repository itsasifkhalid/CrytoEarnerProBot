import express from 'express'

export function test(req: express.Request, res: express.Response) {
	res.end('test handler')
}