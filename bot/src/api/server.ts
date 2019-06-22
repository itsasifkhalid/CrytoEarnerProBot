// Modules
import express from 'express'
import mongoose from 'mongoose'
import router from './router/router'
import Logger from '../init/logger.js'

// Constants
const host: string = 'localhost'
const port: number = 8888

// Express server
const server = express()

// Routing
server.use('/', router);

export default function init() {
	// Listen for requests
	server.listen(port, host, () => {
		console.log(`>>> Api server is listening at ${host}:${port}!`);
		//Logger.trace(`>>> Api server is listening at ${host}:${port}!`);
	})
}