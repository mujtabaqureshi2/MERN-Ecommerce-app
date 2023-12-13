import express from 'express'
import { addOrderItems, getOrderById , getOrders, showMyOrders, updateOrderToDeliver, updateOrderToPaid} from '../controllers/orderController.js'
const router = express.Router()
import { protect } from '../middleware/authMiddleware.js'
import { isAdmin } from '../middleware/authMiddleware.js'



router.route('/').post(protect,addOrderItems).get(protect,isAdmin,getOrders)
router.route('/myorders').get(protect,showMyOrders)
router.route('/:id').get(protect,getOrderById)

router.route('/:id/pay').put(protect,updateOrderToPaid)
router.route('/:id/deliver').put(protect,isAdmin,updateOrderToDeliver)


export default router  