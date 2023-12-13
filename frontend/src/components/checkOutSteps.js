import React from 'react'
import { Nav, NavLink,Col } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

const CheckOutSteps = ({step1,step2,step3,step4}) => {
  return (<Nav className='justify-content-center  mb-4' style={{width:'100%'}}>
       <Col xs={3}>
        <Nav.Item >
             {
                step1 ?(
                <LinkContainer to="/login" className='flex' >
                    <NavLink><span style={{marginRight:'2px',padding:'3px 6px', borderRadius:'50%',display:'inline-block',color:'white' ,backgroundColor:'#82197b'}}>1</span>Sign In</NavLink>
                </LinkContainer>) :  
                <NavLink disabled>Sign In</NavLink>

             }
        </Nav.Item>
        </Col>

        <Col xs={3}>
        <Nav.Item >
             {
                step2 ?(
                <LinkContainer to="/login/shipping">
                    <NavLink><span style={{marginRight:'3px',padding:'4px 8px', borderRadius:'50%',display:'inline-block',color:'white', backgroundColor:'#82197b'}}>2</span>Shipping</NavLink>
                </LinkContainer>) :  
                <NavLink disabled>Shipping</NavLink>

             }
        </Nav.Item>
        </Col>

        <Col xs={3}>
        <Nav.Item >
             {
                step3 ?(
                <LinkContainer to="/payment">
                    <NavLink><span style={{marginRight:'3px',padding:'4px 8px', borderRadius:'50%',display:'inline-block',color:'white', backgroundColor:'#82197b'}}>3</span>Payment</NavLink>
                </LinkContainer>) :  
                <NavLink disabled>Payment</NavLink>

             }
        </Nav.Item>
        </Col>
        <Col xs={3}>
        <Nav.Item >
             {
                step4 ?(
                <LinkContainer to="/login">
                    <NavLink><span style={{marginRight:'3px',padding:'4px 8px', borderRadius:'50%',display:'inline-block',color:'white', backgroundColor:'#82197b'}}>4</span>Place Order</NavLink>
                </LinkContainer>) :  
                <NavLink disabled>Place Order</NavLink>

             }
        </Nav.Item>
        </Col>
    </Nav>
  ) 
}

export default CheckOutSteps
