// Modules
import express from 'express'
import mongoose from 'mongoose'
import router from './router/router'

// Constants
const host: string = 'localhost'
const port: number = 8888

// Express server
const server = express()

// Routing
server.use('/', router);

// Listen for requests
server.listen(port, host, () => {
	console.log(`Api server is listening at ${host}:${port}!`);
})