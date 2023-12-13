import { Button,Card, Col, Row, ListGroup, ListGroupItem,Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckOutSteps from "../components/checkOutSteps";
import Message from "../components/Message";
import { Link } from "react-router-dom";
import { createOrder } from "../actions/orderAction";
import { useEffect } from "react";

const PlaceOrderScreen = () => {
    const cart = useSelector((state) => state.cart);
    const addDecimals = (num) => {
        return (Math.round(num *100)/100).toFixed(2)
    }

    // Calculate Price
    cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc,item)=> acc + item.price * item.qty,0))

    cart.shippingPrice = cart.itemsPrice > 100 ? cart.itemsPrice >200 ? 100: 50 : 100

    cart.taxPrice =addDecimals( Number((0.15 * cart.itemsPrice).toFixed(2)))

    cart.totalPrice =(Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)

    const dispatch  = useDispatch()

    const orderCreate = useSelector(state => state.createOrder)
    const {order, success, error} = orderCreate

    const history = useNavigate()

    useEffect(()=> {
      if(success) {
        history(`/order/${order._id}`)
        //eslint-disable-next-line
      }
    },[history,success])
    

    const placeOrderHandler = () => {
        alert('order placed')
        dispatch(createOrder({
          orderItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          itemsPrice: cart.itemsPrice,
          taxPrice: cart.taxPrice,
          shippingPrice: cart.shippingPrice,
          totalPrice: cart.totalPrice
          
        }) )
    }
  
  return (
    <>
      <CheckOutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong className="text-bold">Address: </strong>
                {cart?.shippingAddress?.address}, {cart?.shippingAddress?.city}{" "}
                , {cart?.shippingAddress?.postalCode} ,{" "}
                {cart?.shippingAddress?.country}{" "}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>{cart?.paymentMethod}</strong>
              </p>
            </ListGroup.Item>
            <ListGroupItem>
                <h2>Order Items</h2>
                {cart.cartItems.length === 0 ? <Message var>Your cart is empty</Message>
                 : (
                    <ListGroup variant="flush">
                        {cart.cartItems.map((item,index)=>(
                            <ListGroup.Item key={index}>
                                <Row>
                                    <Col md={2}>
                                         <Image src={item.image} fluid rounded></Image>
                                         </Col>
                                    <Col>
                                       <Link to={`/product/${item.product}`}>
                                        {item.name}
                                       </Link>
                                    </Col>
                                    <Col md={4}>
                                        {item.qty} x {item.price} = {addDecimals(item.qty * item.price)}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}

                    </ListGroup>
                 )
                 }
            </ListGroupItem>

          </ListGroup>
        </Col>

        <Col md={4} >
            <Card>
                <ListGroup variant="flush">
                   <ListGroupItem>
                    <h2>Order Summary</h2>
                   </ListGroupItem>

                   <ListGroupItem>
                    <Row>
                        <Col>
                        Items
                        </Col>
                        <Col>${cart.itemsPrice}</Col>
                    </Row>
                   </ListGroupItem>

                   <ListGroupItem>
                    <Row>
                        <Col>
                        Shipping
                        </Col>
                        <Col>${cart.shippingPrice}</Col>
                    </Row>
                   </ListGroupItem>

                   <ListGroupItem>
                    <Row>
                        <Col>
                        Tax
                        </Col>
                        <Col>$ {cart.taxPrice}</Col>
                    </Row>
                   </ListGroupItem>

                   <ListGroupItem>
                    <Row>
                        <Col>
                        Total Price
                        </Col>
                        <Col>${cart.totalPrice}</Col>
                    </Row>
                   </ListGroupItem>
                   <ListGroupItem>
                    {error && <Message varaint='danfer'>{error}</Message>}
                   </ListGroupItem>
                   <ListGroupItem>
                    <Button 
                    disabled={cart.cartItems ===0}
                    onClick={placeOrderHandler}
                    className="btn-block" style={{backgroundColor:'#82197b'}}> Place Order</Button>
                   </ListGroupItem>
                </ListGroup>

            </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
