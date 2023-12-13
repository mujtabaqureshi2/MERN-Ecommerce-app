import {Card, Col, Row, ListGroup, ListGroupItem,Image, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import CheckOutSteps from "../components/checkOutSteps";
import Message from "../components/Message";
import { Link } from "react-router-dom";
import axios from "axios";

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getOrderDetails } from "../actions/orderAction";
import Loader from "../components/Loader";
import { orderPay } from "../actions/orderAction";

import { PayPalButton } from "react-paypal-button-v2";
import { ORDER_PAY_RESET } from "../constants/orderConstant";
import { ORDER_DELIVER_RESET } from "../constants/orderConstant";
import { orderDeliver } from "../actions/orderAction";
import { useNavigate } from "react-router-dom";

const OrderScreen = () => {
  const [sdkReady, setSdkReady] = useState(false)
  const addDecimals = (num) => {
    return (Math.round(num *100)/100).toFixed(2)
}
    const orderDetails = useSelector((state) => state.orderDetails);
    const {order,loading,error} = orderDetails

    const userLogin = useSelector((state) => state.userLogin);
    const {userInfo} = userLogin

    const deliverOrder = useSelector((state) => state.orderDeliver);
    const {loading: loadingDeliver, success:successDeliver} = deliverOrder

    const payOrder = useSelector((state) => state.orderPay);
    const {loading: loadingPay, success:successPay} = payOrder

    const {id} = useParams()
    const dispatch = useDispatch()

    const history = useNavigate()
    
   
  

   
    useEffect(()=> {
      
      if(!userInfo) {
        history('/login')
      }   

      const addPayPalScript = async () => {
       const {data: clientId} =  await axios.get('/api/config/paypal')
       const script = document.createElement('script')
       script.type  = 'text/javascript'
       script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
       script.async = true
       script.onload = () => {
        setSdkReady(true)
       }
       document.body.appendChild(script)
      }

  
        
      if(!order || successPay || successDeliver){
        dispatch({type:ORDER_DELIVER_RESET})
        dispatch({type: ORDER_PAY_RESET})
        dispatch(getOrderDetails(id))
      } else if (!order.isPaid) {
        if(!window.paypal){ 
         addPayPalScript()
      } else {
        setSdkReady(true)
      }
      }
    }
    ,[dispatch,successPay,order, id,successDeliver,userInfo,history])

    const orderDeliverHandler = () => {
      dispatch(orderDeliver(id))
    }

    if(!loading){
      order.itemsPrice = addDecimals(order.orderItems.reduce((acc,item)=> acc + item.price * item.qty,0))
    }
    
   
    const successPaymentHandler = (paymentResult) => {
      dispatch(orderPay(id, paymentResult))
    }
 
  
  
  return   loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : <>
   <CheckOutSteps step1 step2 step3 step4 />
   <h1>Order {order._id}</h1> 

   
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p><strong> Name: </strong>{order.user.name}</p>
              <p><strong> Email: </strong><a href={`mailto${order.user.email}`}>{order.user.email}</a></p>
              <p>
                <strong className="text-bold">Address: </strong>
                {order?.shippingAddress?.address}, {order?.shippingAddress?.city}{" "}
                , {order?.shippingAddress?.postalCode} ,{" "}
                {order?.shippingAddress?.country}{" "}
              </p>
              {loadingDeliver && <Loader/>}
              {order.isDelivered ? (<Message variant='success'>Delivered on : {order.deliveredAt}</Message>):(<Message variant='danger'>Not Delivered</Message>)}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method:</strong>
                <strong>{order?.paymentMethod}</strong>
              </p>
              {order.isPaid ? (<Message variant='success'>Paid on : {order.paidAt}</Message>)
                            :(<Message variant='danger'>Not Paid</Message>)}
            </ListGroup.Item>
            <ListGroupItem>
                <h2>Order Items</h2>
                {order.orderItems.length === 0 ? <Message var>Your cart is empty</Message>
                 : (
                    <ListGroup variant="flush">
                        {order.orderItems.map((item,index)=>(
                            <ListGroup.Item key={index}>
                                <Row>
                                    <Col md={2}>
                                         <Image src={item.image} fluid rounded></Image>
                                         </Col>
                                    <Col>
                                       <Link to={`/product/${item.product}`}>
                                        {item.name}
                                       </Link>
                                    </Col>
                                    <Col md={4}>
                                    {item.qty} x {item.price} = {addDecimals(item.qty * item.price)}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}

                    </ListGroup>  
                 )
                 }
            </ListGroupItem>

          </ListGroup>
        </Col>

        <Col md={4} >
            <Card>
                <ListGroup variant="flush">
                   <ListGroupItem>
                    <h2>Order Summary</h2>
                   </ListGroupItem>

                   <ListGroupItem>
                    <Row>
                        <Col>
                        Items
                        </Col>
                        <Col>${order.itemsPrice}</Col>
                    </Row>
                   </ListGroupItem>

                   <ListGroupItem>
                    <Row>
                        <Col>
                        Shipping
                        </Col>
                        <Col>${order.shippingPrice}</Col>
                    </Row>
                   </ListGroupItem>

                   <ListGroupItem>
                    <Row>
                        <Col>
                        Tax
                        </Col>
                        <Col>$ {order.taxPrice}</Col>
                    </Row>
                   </ListGroupItem>

                   <ListGroupItem>
                    <Row>
                        <Col>
                        Total Price
                        </Col>
                        <Col>${order.totalPrice}</Col>
                    </Row>
                   </ListGroupItem>
                   
                    
                  {!order.isPaid && (
                    <ListGroupItem>
                      {loadingPay && <Loader />}
                      {!sdkReady ? <Loader/> :(
                        <PayPalButton amount={order.totalPrice}
                         onSuccess={successPaymentHandler}>

                        </PayPalButton>
                      )}
                      </ListGroupItem>  )}
                   {userInfo && userInfo.isAdmin && order.isPaid &&  !order.isDelivered && (
                    <ListGroupItem>
                      <Button type="btn" className="btn btn-block" onClick={orderDeliverHandler} style={{backgroundColor:'#82197b'}}>Mark as Delivered</Button>
                    </ListGroupItem>
                   )}
                  
                </ListGroup>

            </Card>
        </Col>
      </Row> 
  </>
};

export default OrderScreen;
