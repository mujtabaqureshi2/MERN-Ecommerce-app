import React from 'react'
import { useState } from 'react'
import {Button,Form,FormGroup,FormControl} from 'react-bootstrap'
import FormContainer from '../components/formContainer'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress } from '../actions/cart.actions'
import { useNavigate } from 'react-router-dom'
import CheckOutSteps from '../components/checkOutSteps'

const ShippingScreen = () => {

  const dispatch = useDispatch()
  const history = useNavigate()

  const cart = useSelector(state => state.cart)
  const {shippingAddress} = cart
  console.log(shippingAddress)

   const [address,setAddress]  = useState(shippingAddress.address)
   const [city,setCity]  = useState(shippingAddress.city)
   const [postalCode,setPostalCode]  = useState(shippingAddress.postalCode)
   const [country,setCountry]  = useState(shippingAddress.country)

   const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({address,city,postalCode,country}))
    history('/payment')

    
   }
  return <>
  <CheckOutSteps step1 step2></CheckOutSteps>
  <FormContainer>
    <h1>Shipping</h1>
    <Form onSubmit= {submitHandler} >
    <FormGroup style={{marginBottom: '10px'}} controlId='address' >
            <Form.Label>Address</Form.Label>
            <FormControl 
            type='text'
            placeholder='Enter Address'
            value={address}
            onChange={(e)=> setAddress(e.target.value)}
            >   
            </FormControl>
        </FormGroup>

        <FormGroup style={{marginBottom: '10px'}}>
            <Form.Label>City</Form.Label>
            <FormControl 
            type='text'
            placeholder='Enter City'
            value={city}
            onChange={(e)=> setCity(e.target.value)}
            >   
            </FormControl>
        </FormGroup>

        <FormGroup style={{marginBottom: '10px'}} controlId='postalCode'>
            <Form.Label>Postal Code</Form.Label>
            <FormControl 
            type='text'
            placeholder='Enter postal Code'
            value={postalCode}
            onChange={(e)=> setPostalCode(e.target.value)}
            >   
            </FormControl>
        </FormGroup>
        <FormGroup style={{marginBottom: '10px'}} controlId='country'>
            <Form.Label>Country</Form.Label>
            <FormControl 
            type='text'
            placeholder='Enter Country'
            value={country}
            onChange={(e)=> setCountry(e.target.value)}
            >   
            </FormControl>
        </FormGroup>
        <Button className='mt-4' type= 'submit' style={{backgroundColor:'#82197b'}}>Continue</Button>
        </Form>
  </FormContainer>
  </>
   
  
}

export default ShippingScreen
