import express from 'express'
const router = express.Router()
import { createProduct, createdProductReviews, deleteProductById, getProductById,getProducts, getTopProducts, updateProduct } from '../controllers/productConroller.js'
import { protect,isAdmin } from '../middleware/authMiddleware.js' 


router.route('/').get(getProducts).post(protect,isAdmin, createProduct)
router.get('/top',getTopProducts)

router.route('/:id/reviews').post(protect,createdProductReviews)
router.route('/:id').get(getProductById).delete(protect,isAdmin, deleteProductById).put(protect,isAdmin,updateProduct)

export default router 