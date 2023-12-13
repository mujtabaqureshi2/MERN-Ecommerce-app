import React from 'react'
import { Nav,Container, Navbar, NavDropdown } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import { useSelector,useDispatch } from 'react-redux';
import { logout } from '../actions/userActions';
import { useNavigate } from 'react-router-dom';
import SearchBox from './SearchBox';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';



const Header = () => {
  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin
  const history = useNavigate()
  

  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logout())
    history('/')

  }
  return (
    
    <header>
          <Navbar expand="lg" variant='dark' collapseOnSelect style={{backgroundColor: '#82197b'}}> 
      <Container>
        <LinkContainer to = '/'>
        <Navbar.Brand> Fashion+</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
         
         {<SearchBox history= {history}/>}   
          
          <Nav className="ml-auto">
          <LinkContainer to = '/cart'>
            <Nav.Link ><i className='fas fa-shopping-cart mr-2'> </i>Cart</Nav.Link>
            </LinkContainer>
            {userInfo ?
             <NavDropdown title={userInfo.name} id='username'>
              <LinkContainer to='/profile'>
                <NavDropdown.Item>Profile</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
            </NavDropdown>
             :( <LinkContainer to = '/login'>
            <Nav.Link > <i className='fas fa-user mr-2 '> </i>Sign In</Nav.Link>
            </LinkContainer> )}

            {userInfo && userInfo.isAdmin && (
               <NavDropdown title='Admin' id='adminmenu'>
               <LinkContainer to='/admin/userList'>
                 <NavDropdown.Item>Users</NavDropdown.Item>
               </LinkContainer>

               <LinkContainer to='/admin/productList'>
                 <NavDropdown.Item>Products</NavDropdown.Item>
               </LinkContainer>

               <LinkContainer to='/admin/orderList'>
                 <NavDropdown.Item>Order</NavDropdown.Item>
               </LinkContainer>
             </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  

    </header>
  )
}

export default Header;
