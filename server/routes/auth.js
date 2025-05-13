import express from 'express'
import { authController } from '../controllers/index.js'
import { adminCheck, authCheck } from '../middleware/auth.js'
const router = express.Router()

router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/current-user', [authCheck],authController.currentUser)
router.post('/current-admin', [authCheck,adminCheck],authController.currentUser)


export default router