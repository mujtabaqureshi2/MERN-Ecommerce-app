import React from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import { useEffect } from 'react'
import {Button, Table} from 'react-bootstrap'


import {useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {getUserList} from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader' 
import { userDelete } from '../actions/userActions'

const UserListScreen = () => {
  const dispatch = useDispatch()
  const history = useNavigate()


  const deleteHandler= (id) => {
    if(window.confirm('Are you sure')) {
      dispatch(userDelete(id)) 
    }
   
  }

  const listUser = useSelector(state => state.userList)   
  const {loading, error, users} = listUser 

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin 

  const deleteUser = useSelector(state => state.userDelete)
  const {success:deleteSuccess} = deleteUser 

  useEffect(()=> {

    if(userInfo && userInfo.isAdmin){
      dispatch(getUserList()) 
    } else { 
      history('/')
    }
   
  },[dispatch,history,deleteSuccess,userInfo])
  
  return (
    <>
    <h1>All Users</h1>

    {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message>: (

      <Table striped hover resposive className='table-sm'>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>Admin</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map(user =>(
                <tr id={user._id}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                    <td>{user.isAdmin ? (<i className='fas fa-check' style={{color:'green'}}></i>) :
                    (<i className='fas fa-times' style={{color:'red'}}></i>)}
                    </td>
                    <td>
                      <LinkContainer to={`/admin/User/${user._id}/edit`}>
                        <Button variant='light' className='btn-sm'>
                            <i className='fas fa-edit'></i>
                        </Button>
                      </LinkContainer>
                      <Button variant='danger' className='btn-sm' onClick={()=>
                       deleteHandler(user._id) 
                  }> <i className='fas fa-trash'></i>
                      </Button>
                    </td>
                </tr>
          ))}
        </tbody>

      </Table>
    )}


    </>
  )
}

export default UserListScreen