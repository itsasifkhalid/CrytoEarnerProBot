import { Router } from 'express'
import * as handlers from '../handlers/handlers'

// Express router
const router = Router()

// Routes
router.get('/stats/all', handlers.stats.all);
router.get('/stats/balance', handlers.stats.balance);
router.get('/stats/investors_amount', handlers.stats.investorsAmount);
router.get('/stats/investors_today', handlers.stats.investorsToday);
router.get('/investors/all', handlers.investors.all);
router.get('/investors/investor', handlers.investors.investor);
router.get('/auth/check', handlers.auth.check)
router.get('/auth/sign_out', handlers.auth.signOut)
router.post('/investors/add_investment', handlers.investors.addInvestment)
router.post('/investors/set_investor_status', handlers.investors.setInvestorStatus)
router.post('/investors/set_investment_status', handlers.investors.setInvestmentStatus)
router.post('/investors/set_investment_note', handlers.investors.setInvestmentNote)
router.post('/auth/sign_in', handlers.auth.signIn)

// Default export
export default router