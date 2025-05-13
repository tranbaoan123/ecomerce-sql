import express from 'express'
import { adminController } from '../controllers/index.js'
import { authCheck } from '../middleware/auth.js'
const router = express.Router()

router.put('/order-status', [authCheck],adminController.changeOrderStatus)
router.get('/orders', [authCheck],adminController.getOrderAdmin)


export default router