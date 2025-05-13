import express from 'express'
import { productController } from '../controllers/index.js'
import { adminCheck, authCheck } from '../middleware/auth.js'
const router = express.Router()

router.get('/',productController.getAllProducts)
router.post('/',[authCheck,adminCheck],productController.createProduct)
router.put('/:id',productController.updateProduct)
router.get('/:id',productController.getOne)
router.delete('/:id',[authCheck,adminCheck],productController.removeProduct)
router.post('/productby',productController.listProductBy)
router.post('/search/filters',productController.searchFilter)
router.post('/upload-images',[authCheck,adminCheck],productController.uploadImages)
router.post('/delete-images',[authCheck,adminCheck],productController.deleteImages)

export default router