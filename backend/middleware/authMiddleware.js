import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'

const protect = asyncHandler(async(req,res,next) => {
    let token


    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
       try {
         token = req.headers.authorization.split(' ')[1]

         const decoded = jwt.verify(token, process.env.JWT_SECRET)
         req.user = await User.findById(decoded.id).select('-password')

         
       } catch (error) {
        console.error(error)
        res.status(401)
        throw new Error("Not authorized, token failed")
        
       }
    }

    if(!req.headers.authorization){
        res.status(401)
        throw new Error('No token, No authorization')
    }

    next()
})

const isAdmin = asyncHandler(async(req,res,next)=>{
  if(req.user.isAdmin){
    next()
  } else{
    throw new Error('User is not an admin')
  }
}) 




export {protect,isAdmin}