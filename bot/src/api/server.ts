// Modules
import express, { Express, Router } from 'express'
import bodyParser from 'body-parser'
import router from './router/router'
import Logger from '../init/logger.js'

const cors = require('cors')

export default class Server {
	public static host: string = 'localhost'
	public static port: number = 8888

	public static app: Express = express()
	public static router: Router = router

	public static init() {
		// Using CORS
		this.app.use(cors())
		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({ extended: true }));
 
		// Routing
		this.app.use('/', this.router)

		// Listen for requests
		this.app.listen(this.port, this.host, () => {
			Logger.trace(`>>> АПИ сервер слушает на http://${this.host}:${this.port}`);
		})
	}
}
