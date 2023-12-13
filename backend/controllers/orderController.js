import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

// desc@     Fetch all prodcts
//route      GET /api/products
//access     Public

const addOrderItems = asyncHandler( async(req, res) => {
   const {orderItems, shippingAddress, paymentMethod,itemsPrice,taxPrice, shippingPrice, totalPrice} = req.body

   if(orderItems && orderItems === 0){
    res.status(400)
    throw new Error('No order items')
    return
   } else {
      const order = new Order ({
        orderItems,
        user: req.user._id,
         shippingAddress,
          paymentMethod,
          itemsPrice,
          taxPrice,
           shippingPrice, 
           totalPrice   
      })
 
      const createdOrder = await order.save() 

      res.status(201).json(createdOrder)
   }
})


const getOrderById = asyncHandler( async(req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email')

  if (order){
   res.json(order)
  }
  else {
   res.status(404)
   throw new Error('Order not found')
  }
})


 //desc@     Get all orders in the admin orders dashboard
 //route      GET /orders/myorders
 //access     Private/admin
const getOrders = asyncHandler( async(req, res) => {
  const orders = await Order.find({}).populate('user', 'name email')

  if (orders){
   res.json(orders)
  }
  else {
   res.status(404)
   throw new Error('Orders not found')
  }
})

const updateOrderToDeliver = asyncHandler( async(req, res) => {
   const order = await Order.findById(req.params.id)
 
   if (order){
        order.isDelivered = true
        order.deliveredAt = Date.now()
        

        const updatedOrder = await order.save()

        res.json(updatedOrder)
   }
   else {
    res.status(404)
    throw new Error('Order not found')
   }
 })

 const updateOrderToPaid = asyncHandler( async(req, res) => {
  const order = await Order.findById(req.params.id)

  if (order){
       order.isPaid = true
       order.paidAt = Date.now()
       order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
        name: req.body.payer.name.given_name,
       }

       const updatedOrder = await order.save()

       res.json(updatedOrder)
  }
  else {
   res.status(404)
   throw new Error('Order not found')
  }
})

 // desc@     Get logged in users orders
//route      GET /orders/myorders
//access     Private
 const showMyOrders = asyncHandler( async(req, res) => {
   const orders = await Order.find({user: req.user._id})
 res.json(orders)
 })
 
 export {addOrderItems,getOrderById,updateOrderToPaid,showMyOrders, getOrders, updateOrderToDeliver}
