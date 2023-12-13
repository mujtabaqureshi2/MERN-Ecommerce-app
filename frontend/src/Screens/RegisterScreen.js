import React, { useEffect, useState } from 'react'
import {Button, Col, Row,Form,FormGroup,FormControl} from 'react-bootstrap'
import FormContainer from '../components/formContainer'
import { Link } from 'react-router-dom'
import { useLocation,useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { register } from '../actions/userActions'




const RegisterScreen = () => {
    const userRegister = useSelector(state => state.userRegister )
    const {loading, error, userInfo} = userRegister
    const [name, setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] =useState('')
    const [message,setMessage] = useState(null)
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
        if(password !== confirmPassword){
            setMessage('Password do not match')

        }
        //Dispatch Login
        dispatch((register(name,email,password)))
    }

  return ( <FormContainer>
    <checkOutSteps></checkOutSteps>
    <h1>Sign In</h1>
    {message && <Message variant='danger'>{message}</Message> }
    {error && <Message variant='danger'>{error}</Message> }
    {loading && <Loader/>}
 
    <Form onSubmit= {submitHandler}>
    <FormGroup>
            <Form.Label>Name Address</Form.Label>
            <FormControl 
            type='text'
            placeholder='Enter Name'
            value={name}
            onChange={(e)=> setName(e.target.value)}
            >
                
            </FormControl>
        </FormGroup>

        <FormGroup>
            <Form.Label>Email Address</Form.Label>
            <FormControl 
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            >
                
            </FormControl>
        </FormGroup>

        <FormGroup>
            <Form.Label>Password </Form.Label>
            <FormControl 
            type='password'
            placeholder='Enter Password'
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            >
                
            </FormControl>
        </FormGroup>

        <FormGroup>
            <Form.Label>Confirm Password </Form.Label>
            <FormControl 
            type='password'
            placeholder='Enter Password'
            value={confirmPassword}
            onChange={(e)=> setConfirmPassword(e.target.value)}
            >
                
            </FormControl>
        </FormGroup>

        <Button className='mt-4' type= 'submit' style={{backgroundColor:'#82197b'}}
        >Sign Up</Button>
    </Form>

    <Row  className='py-3' >
        <Col>

       Already have an accound?{' '}
        <Link to={redirect ? `/login? redirect=${redirect}`: '/login '} className='font-bold'>Sign Up </Link>

        </Col>
    </Row>
  
</FormContainer>
  )
  
}

export default RegisterScreen
