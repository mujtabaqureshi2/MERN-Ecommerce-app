import React from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import { useEffect } from 'react'
import {Button, Table,Row, Col} from 'react-bootstrap'


import {useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Message from '../components/Message'
import Loader from '../components/Loader' 


import { listOrders } from '../actions/orderAction'

const OrdersListScreen = () => {
  const dispatch = useDispatch()
  const history = useNavigate()


  

  

  const listOrder = useSelector(state => state.orderList)   
  const {loading, error, orders} = listOrder


  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin 

  useEffect(()=> {

    if(!userInfo.isAdmin){
      history('/')
    } else {
      dispatch(listOrders()) 
    }
   
},[dispatch,history,userInfo])
  
  return (
    <>
    <Row className='align-items-center'>
      <Col>
      <h1>Orders List</h1>
      </Col>
      
    </Row>

   

  

    {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message>: (

      <Table striped hover resposive className='table-sm'>
        <thead>
          <tr>
            <th>ID</th>
            <th>USER</th>
            <th>TOTAL</th>
            <th>PAID</th>

            <th>Delivered</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order =>(
                <tr id={order._id}>
                    <td>{order._id}</td>
                    <td>{order.user.name}</td>
                    <td>{order.totalPrice}</td>
                    <td>{order.isPaid ?  order.paidAt.substring(1,10):(
                      <i className='fa fa-times'></i>
                    )}
                    
                    </td>
                    <td style={{textAlign: 'center', verticalAlign: 'middle'}}>
                      {order.isDelivered ? order.deliveredAt.substring(1,10) :(
                      <i className='fa fa-times justify-self-center' style={{color:'red'}}></i>
                    )}
                    
                    </td>
                    <td>
                      <LinkContainer to={`/order/${order._id}/`} style={{marginRight: '3px'}}> 
                        <Button variant='light' className='btn-sm'>
                            Details
                        </Button>
                      </LinkContainer>
                       
                    </td>
                </tr>
          ))}
        </tbody>
  
      </Table>
    )}


    </>
  )
}

export default OrdersListScreen