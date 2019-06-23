import { Router } from 'express'
import * as handlers from '../handlers/handlers'

// Express router
const router = Router()

// Routes
router.get('/stats/balance', handlers.stats.balance);
router.get('/stats/investors_amount', handlers.stats.investorsAmount);
router.get('/stats/investors_today', handlers.stats.investorsToday);
router.get('/investors/all', handlers.investors.all);
router.get('/investors/investor', handlers.investors.investor);
router.post('/auth/sign_in', handlers.auth.signIn)


/*
	/stats/balance - общий баланс
	/stats/investors_amount - общее кол-во юзеров
	/stats/investors_today - кол-во новых юзеров сегодня
	/investors/all - JSON с инфой обо всех юзерах
	/investors/investor?username=example - JSON с инфой об одном юзере
*/

// Default export
export default router