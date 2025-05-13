import express from 'express'
import { categoryController } from '../controllers/index.js'
import {authCheck,adminCheck} from '../middleware/auth.js'
const router = express.Router()

router.get('/',categoryController.getAllCategories)
router.post('/',[authCheck,adminCheck],categoryController.createCategory)
router.delete('/:id', [authCheck,adminCheck],categoryController.removeCategory)


export default router