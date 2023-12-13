import React from 'react'
import { useState } from 'react'
import {Button, Col,Form,FormGroup} from 'react-bootstrap'
import FormContainer from '../components/formContainer'
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../actions/cart.actions'
import { useNavigate } from 'react-router-dom'
import CheckOutSteps from '../components/checkOutSteps'

const PaymentScreen = () => {

  const dispatch = useDispatch()
  const history = useNavigate()

  const cart = useSelector(state => state.cart)
  const {shippingAddress} = cart
  if(!shippingAddress){
    history('./login/shipping')
  }

   const [payment,setPayment]  = useState('Paypal')
   

   const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(payment))
    history('/placeOrder')

    
   }
  return <>
  <CheckOutSteps step1 step2 step3></CheckOutSteps>
   <FormContainer>
    <h1>Payment Method</h1>
    <Form onSubmit= {submitHandler} >
    <FormGroup style={{marginBottom: '10px'}}  >
            <Form.Label as= 'legend'>Select Method</Form.Label>
           <Col >
            <Form.Check className='mb-3'
            type='radio'
            label = 'Paypal or Credit Card'
            id='PayPal'
            name='paymentMehtod'
            value='paypal'
            checked
            onChange={(e) => setPayment(e.target.value)}
            >

            </Form.Check>

            <Form.Check
            type='radio'
            label = 'Stripe'
            id='PayPal'
            name='paymentMehtod'
            value='stripe'
            
            onChange={(e) => setPayment(e.target.value)}
            >

            </Form.Check>
           </Col>
        </FormGroup>

       
        <Button className='mt-4' type= 'submit' variant='primary'>Continue</Button>
        </Form>
  </FormContainer>
  </>
   
  
}

export default PaymentScreen
