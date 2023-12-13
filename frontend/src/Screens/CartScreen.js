import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../actions/cart.actions'
import Message from '../components/Message'
import { Col, Row, Image, ListGroup, Card, ListGroupItem, Button, FormControl } from 'react-bootstrap'
import { removeToCart } from '../actions/cart.actions'

const CartScreen = () => {

    const addDecimals = (num) => {
        return (Math.round(num *100)/100).toFixed(2)
    }

    const history = useNavigate()
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    const submitHandler = () => {
        if (!userInfo) {
            history('/login?redirect=shipping')
        }
        else {
            history('/login/shipping')
        }

    }
    const dispatch = useDispatch()
    const { id } = useParams()
    const productId = id
    const location = useLocation()
    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart
    console.log(cartItems)

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeToCart(id))
    }



    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? (<Message>
                    Your Cart is empty <Link to='/'>Go Back</Link>
                </Message>)
                    : (<ListGroup variant='flush'>
                        {cartItems.map(item =>
                            <ListGroup.Item key={item.product}>
                                <Row>
                                    <Col md={3}>
                                        <Image src={item.image} alt={item.name} fluid rounded />
                                    </Col>
                                    <Col md={2}>${item.price}</Col>
                                    <Col md={2}>
                                        <FormControl value={item.qty} as='select'
                                            onChange={(e) => dispatch(addToCart(item.product,
                                                Number(e.target.value)))}>
                                            {
                                                [...Array(item.countInStock).keys()].map(x =>

                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                )
                                            }
                                        </FormControl>
                                    </Col>
                                    <Col md={2}>
                                        <Button type='button' variant='light' onClick={() =>
                                            removeFromCartHandler(item.product)} > <i className='fas fa-trash' />  </Button>
                                    </Col>
                                </Row>

                            </ListGroup.Item>
                        )}
                    </ListGroup>)}

            </Col>
            <Col md={4}>
                <Card style={{ marginTop: '40px' }}>
                    <ListGroup variant='flush'>
                        <ListGroupItem>
                            <h2>
                                Subtotal ({addDecimals(cartItems.reduce((acc, item) => acc + item.qty, 0))}) items
                            </h2>
                            $  {addDecimals(cartItems.reduce((acc, item) => acc + item.qty * item.price, 0))}
                        </ListGroupItem>
                        <ListGroupItem >
                            <Button type='button' className='btn-block' disabled={cartItems.length === 0} onClick={submitHandler} style={{backgroundColor:'#82197b'}}>
                                Proceed to Checkout
                            </Button>
                        </ListGroupItem>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen
