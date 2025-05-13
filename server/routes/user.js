import express from 'express'
import { userController } from '../controllers/index.js'
import { adminCheck, authCheck } from '../middleware/auth.js'
const router = express.Router()

router.get('/',[authCheck,adminCheck],userController.getAllUser)
router.put('/change-status',[authCheck,adminCheck],userController.changeStatus)
router.put('/change-role',[authCheck,adminCheck],userController.changeRole)
router.post('/user-cart',[authCheck],userController.userCart)
router.get('/user-cart',[authCheck],userController.getUserCart)
router.delete('/user-cart',[authCheck],userController.emptyCart)
router.post('/user-address',[authCheck],userController.saveAddress)
router.get('/user-order',[authCheck],userController.getOrder)
router.post('/user-order',[authCheck],userController.saveOrder)


export default router