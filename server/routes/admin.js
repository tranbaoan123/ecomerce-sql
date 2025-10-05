import express from 'express'
import { adminController } from '../controllers/index.js'
import { adminCheck, authCheck } from '../middleware/auth.js'
const router = express.Router()

router.put('/order-status', [authCheck,adminCheck],adminController.changeOrderStatus)
router.get('/orders', [authCheck,adminCheck],adminController.getOrderAdmin)
router.get('/users', [authCheck,adminCheck],adminController.getUserAdmin)
router.put('/user-status', [authCheck,adminCheck],adminController.changeUserStatus)


export default router