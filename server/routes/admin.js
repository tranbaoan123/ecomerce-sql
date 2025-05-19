import express from 'express'
import { adminController } from '../controllers/index.js'
import { adminCheck, authCheck } from '../middleware/auth.js'
const router = express.Router()

router.put('/order-status', [authCheck,adminCheck],adminController.changeOrderStatus)
router.get('/orders', [authCheck,adminCheck],adminController.getOrderAdmin)


export default router