import React, { useEffect, useState } from 'react'
import {Button, Col, Row,Form,FormGroup,FormControl,Table} from 'react-bootstrap'
import {useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {updateUserProfile } from '../actions/userActions'
import { details } from '../actions/userActions'
import { listMyOrder } from '../actions/orderAction'
import { LinkContainer } from 'react-router-bootstrap'




const ProfileScreen = () => {
    const userDetails = useSelector(state => state.userDetails )
    const {loading, error, user} = userDetails

    const userLogin = useSelector(state => state.userLogin )
    const {userInfo} = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile )
    const {success} = userUpdateProfile

    const myOrderList = useSelector(state => state.listMyOrder )
    const {loading: loadingOrder, error:orderError, orders} = myOrderList
    console.log(orders)


    const [name, setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] =useState('')
    const [message,setMessage] = useState(null)

    const history = useNavigate() 
    const dispatch = useDispatch()



    useEffect(()=> {
        if(!userInfo){
            history('/login')
        }
        else{
            if(!user.name){
                dispatch(details('profile'))
                dispatch(listMyOrder())
            }else {
                   setName(user.name)
                   setEmail(user.email)
            }
        }
    },[dispatch,history,userInfo,user]) 

    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage('Password do not match')

        }
        //Dispatch Update User Profile
        dispatch(updateUserProfile({id: user._id,name,email,password}))
        
    }

  return (<Row>
    <Col md={4} style={{paddingRight: '20px'}}>
    <h1>Update Profile</h1>
    {message && <Message variant='danger'>{message}</Message> }
    {error && <Message variant='danger'>{error}</Message> }
    {success && <Message variant='success'>Profile Updated</Message> }
    {loading && <Loader/>}
 
    <Form onSubmit= {submitHandler}>
    <FormGroup style={{paddingBottom: '8px'}}>
            <Form.Label>Name</Form.Label>
            <FormControl 
            type='text'
            placeholder='Enter Name'
            value={name}
            onChange={(e)=> setName(e.target.value)}
            >
                
            </FormControl>
        </FormGroup>

        <FormGroup style={{paddingBottom: '8px'}}>
            <Form.Label>Email Address</Form.Label>
            <FormControl 
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            >
                
            </FormControl>
        </FormGroup>

        <FormGroup style={{paddingBottom: '8px'}}>
            <Form.Label>Password </Form.Label>
            <FormControl 
            type='password'
            placeholder='Enter Password'
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            >
                
            </FormControl>
        </FormGroup>

        <FormGroup style={{paddingBottom: '8px'}}>
            <Form.Label>Confirm Password </Form.Label>
            <FormControl 
            type='password'
            placeholder='Enter Password'
            value={confirmPassword}
            onChange={(e)=> setConfirmPassword(e.target.value)}
            >
                
            </FormControl>
        </FormGroup>

        <Button className='mt-4' type= 'submit' style={{backgroundColor:'#82197b'}}>Update Profile</Button>
    </Form>
    </Col>
    <Col md={8}>
        <h1 My>Orders</h1>
       {loadingOrder ? <Loader/> : orderError ? <Message variant='red'>{orderError}</Message> : (
         <Table variant='secondary'>
         <thead style={{textAlign: 'center', verticalAlign: 'middle'}}>
           <tr>
             <th scope="col">Order ID</th>
             <th scope="col">Total</th>
             <th scope="col">Paid</th>
             <th scope="col">Delivered</th>
           </tr>
         </thead>
         <tbody>
           {orders?.map((order) => (
             <tr key={order._id}>
               <td>{order._id}</td>
               <td>{order.totalPrice}</td>
               <td>{order.isPaid ? order.paidAt.substring(0,10) : (
                <span> <i className='fa fa-times' style={{color:'red'}}></i> Not Paid</span>
               )}</td>
               <td style={{textAlign: 'center', verticalAlign: 'middle'}}>{order.isDelivered ? 
                    <i class="fas fa-check-circle justify-self-center" style={{color: 'green'}}></i> :
                    <i className='fa fa-times flex justify-self-center' style={{color:'red'}}></i> }</td>
               <td >
                <LinkContainer to={`/order/${order._id}`}>
                    <Button className='btn-sm' style={{backgroundColor:'#82197b'}}>Details</Button> 
                </LinkContainer>
               </td>
               
              
             </tr>
             
             ))}
         </tbody>
       </Table>
        )}
    </Col>
    
    </Row>
    )
     
}

export default ProfileScreen
