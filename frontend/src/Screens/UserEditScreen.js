import React, { useEffect, useState } from 'react'
import {Button,Form,FormGroup,FormControl, FormCheck} from 'react-bootstrap'
import FormContainer from '../components/formContainer'
import { Link } from 'react-router-dom'
import {useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { details , updateUser} from '../actions/userActions'
import { useParams } from 'react-router-dom'
import { USER_UPDATE_RESET } from '../constants/userConstants'




const UserEditScreen = () => {
    const userDetails = useSelector(state => state.userDetails )
    const {loading, error, user} = userDetails

    const userUpdate = useSelector(state => state.userUpdate )
    const {loading:loadingUpdate, error:errorUpdate, success: successUpdate} = userUpdate

    const [name, setName] = useState(user.name)
    const [email,setEmail] = useState(user.email)
    const [admin,setAdmin] = useState(user.isAdmin)
    const dispatch = useDispatch()
    const {id} = useParams()
    const history = useNavigate()




    useEffect(()=> {
      if(successUpdate){
        dispatch({type:USER_UPDATE_RESET})
        history('/admin/userList')

      } else {
        if(!user.name || user._id !== id){
          dispatch(details(id))
        } else {
          setAdmin(user.isAdmin)
          setName(user.name)
          setEmail(user.email)
        }
      }
      
        
    },[dispatch,id,user,history, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault() 
        dispatch(updateUser({_id: id, name, email,isAdmin:admin}))
       
    }

  return   <>
  <Link className='btn btn-light my-3' to="/adminUserList">Go Back</Link> 
  <FormContainer>
    
    <h1>Edit User</h1>
    {loadingUpdate && <Loader/>}
    {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
   {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
     <Form onSubmit= {submitHandler}>
     <FormGroup style={{paddingBottom: '10px'}}>
             <Form.Label>Name</Form.Label>
             <FormControl 
             type='text'
             placeholder='Enter Name'
             value={name}
             onChange={(e)=> setName(e.target.value)}
             >
                 
             </FormControl>
         </FormGroup>
 
         <FormGroup style={{paddingBottom: '10px'}}>
             <Form.Label>Email Address</Form.Label>
             <FormControl 
             type='email'
             placeholder='Enter email'
             value={email}
             onChange={(e)=> setEmail(e.target.value)}
             >
                 
             </FormControl>
         </FormGroup>
 
         <FormGroup controlId='admin' style={{paddingBottom: '10px'}}>
             <FormCheck 
             type='checkbox'
             label= 'Is Admin'
             checked = {admin}
             onChange={(e)=> 
              
              setAdmin(e.target.checked)}
             >
                 
             </FormCheck>
         </FormGroup>
 
         
 
         <Button className='mt-4' type= 'submit' style={{backgroundColor:'#82197b'}}>Update User</Button>
     </Form>
   )}

  
</FormContainer>
    </>
 
  
  
}

export default UserEditScreen
