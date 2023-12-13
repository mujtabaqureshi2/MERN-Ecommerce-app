import express from 'express'
const router = express.Router()
import { protect,isAdmin } from '../middleware/authMiddleware.js'

import {getProfile, getUser, registerUser, updateProfile,getAdmin, deleteUser, getUserById, updateUserById} from '../controllers/userController.js'

router.post('/login',getUser)
router.route('/profile').get(protect,getProfile).put(protect,updateProfile)
router.route('/').post(registerUser).get(protect,isAdmin, getAdmin )

router.route('/:id').delete(protect,isAdmin,deleteUser).get(protect,isAdmin,getUserById).put(protect,isAdmin,updateUserById)
export default router  