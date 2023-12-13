import React, { useEffect, useState } from 'react'
import {Button, Col, Row,Form,FormGroup,FormControl} from 'react-bootstrap'
import FormContainer from '../components/formContainer'
import { Link } from 'react-router-dom'
import { useLocation,useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import  {login} from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'



const LoginScreen = () => {
    const userLogin = useSelector(state => state.userLogin )
    const {loading, error, userInfo} = userLogin
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const location = useLocation()
    const history = useNavigate()
    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1]: '/'

    useEffect(()=> {
        if(userInfo){
            history(redirect)
        }
    },[history,userInfo,redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        //Dispatch Login
        dispatch((login(email,password)))
    }

  return  <FormContainer>
    <h1>Sign In</h1>
    {error && <Message variant='danger'>{error}</Message> }
    {loading && <Loader/>}
 
    <Form onSubmit= {submitHandler}>
        
        <FormGroup  style={{paddingBottom: '8px'}} >
            <Form.Label>Email Address</Form.Label>
            <FormControl 
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            >
                
            </FormControl>
        </FormGroup>

        <FormGroup  style={{paddingBottom: '8px'}}>
            <Form.Label>Password </Form.Label>
            <FormControl 
            type='password'
            placeholder='Enter Password'
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            >
                
            </FormControl>
        </FormGroup>

        <Button className='mt-4' type= 'submit' variant='primary' style={{backgroundColor:'#82197b'}}>Sign In</Button>
    </Form>

    <Row  className='py-3' >
        <Col>

        New Customer?{' '}
        <Link to={redirect ? `/register? redirect=${redirect}`: '/register'} className='font-bold'>Register</Link>

        </Col>
    </Row>
  
</FormContainer>
  
}

export default LoginScreen
