import React from 'react'
import { useEffect,useState } from 'react'
import { Col,Row,Image ,Form,ListGroup, Card, ListGroupItem, Button, FormControl} from 'react-bootstrap'
import { Link,useParams, useNavigate } from 'react-router-dom'
import Rating from '../components/Rating'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
import { createProductReview } from '../actions/productActions'
import Meta from '../components/Meta'



const ProductScreen = () => {

  const [qty,setQty] = useState(0)
  const [rating,setRating] = useState(0)
  const [comment,setComment] = useState('')


  const history = useNavigate()
 const {id} = useParams();
     const dispatch = useDispatch()

     const productDetail= useSelector((state)=> state.productDetail);
      const {loading,error, product} =productDetail
      
     const userLogin= useSelector((state)=> state.userLogin);
     const {userInfo} =userLogin

      const productCreateReview= useSelector((state)=> state.productCreateReview);
      const {loading: productCreateReviewLoading,error:productCreateReviewError, success:productCreateReviewSuccess} =productCreateReview
      

 useEffect(()=>{

      if(productCreateReviewSuccess) {
        alert('Review Added')
        setRating(0)
        setComment('')
        dispatch({type: PRODUCT_CREATE_REVIEW_RESET})
      }
      dispatch(listProductDetails(id))

 },[dispatch,id ,productCreateReviewSuccess] ); 

 const onSubmitHandler = () => {
      history(`/cart/${id}?qty=${qty === 0 ? 1: qty}`)
 }  

 const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createProductReview(id,{rating,comment}))

 }
  
  
  if(!product) return 'No match found';
  return (
    <>
    <Link className='btn btn-light my-3'  
    to = '/'>Go back</Link>
      
      
      {loading? <Loader/> : error ? <Message variant='danger'>{error}</Message>
      : 
      <>
      <Meta title={product.name}></Meta>
    <Row>
      <Col md={6}>
        <Image src={product.image} alt={product.name} fluid/>
      </Col>
      <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item><h3>{product.name}</h3></ListGroup.Item>
          </ListGroup>
          <ListGroup.Item>
            <Rating value={product.rating} text= {`${product.numReviews} reviews`} />
          </ListGroup.Item>

         

          <ListGroup variant='flush'>
            <ListGroup.Item>{product.description}</ListGroup.Item>
          </ListGroup>
      </Col>

      <Col md= {3} className={{paddingTop:'300px'}}>   
        <Card> 

           <ListGroup variant='flush'>
            <ListGroupItem>
              <Row>
                <Col>Price</Col>
                <Col>${product.price} </Col>      
              </Row>
            </ListGroupItem>

            <ListGroupItem> 
              <Row> 
                <Col>Status</Col>
                <Col>
                {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}

                </Col>
              </Row>
            </ListGroupItem>
            <ListGroupItem>
              <Row>
                <Col>
                  Qty
                </Col>
                <Col>
                  <FormControl value={qty} as='select'
                  onChange={ (e) => setQty(e.target.value)}>
                    {
                      [...Array(product.countInStock).keys()].map(x => 

                          <option key={x+1} value={x+1}>
                                {x+1}
                          </option>
                        )
                    }
                  </FormControl>
                </Col>
              </Row>
            </ListGroupItem>
            <ListGroupItem>
                <Button className='btn-block' type='button' disabled={product.countInStock ===0}
                   onClick={onSubmitHandler} style={{backgroundColor:'#82197b'}}>
                  Add to Cart
                </Button>
            

            </ListGroupItem>
           </ListGroup>
        </Card>
      </Col>
    </Row>
    <Row>
      <Col md={6} style={{marginTop: '28px'}}>
        <h2>Reviews</h2>
        {product.reviews.length === 0 && <Message>No Reviews</Message>}
        <ListGroup variant='flush'>
          {product.reviews.map((review)=>(
            <ListGroupItem key={review._id} rounded shadow p-3 mb-5 style={{backgroundColor: '#e5ebe4'}}> 
              <strong>{review.name}</strong> 
              <Rating value={review.rating} color='yellow' />
              <p>{review.createdAt.substring(0,10)}</p>
              <p className='py-2 px-2 bg-white' rounded-3>{review.comment}</p>
            </ListGroupItem>
          ))}
          <ListGroupItem>
            <h2>Write a Customer Review</h2>
            {productCreateReviewError && <Message variant='danger'>{productCreateReviewError}</Message>}
            {productCreateReviewLoading && <Loader/>}
            {userInfo ? (
              <Form onSubmit= {submitHandler}>
                <Form.Group controlId='rating'>
                  <Form.Label>Rating</Form.Label>
                  <Form.Control as='select' value={rating} 
                  onChange={(e) => setRating(e.target.value)}> 
                    <option value=''>Select...</option>
                    <option value='1'>1 - Poor</option>
                    <option value='2'>2 - Fair</option>
                    <option value='3'>3 - Good</option>
                    <option value='4'>4 - Very Good</option>
                    <option value='5'>5 - Excellent</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId = 'comment'>
                  <Form.Label>Comment</Form.Label>
                  <FormControl as='textarea' rows='3'
                     row='3'
                     value={comment}
                     onChange={e => setComment(e.target.value)}>

                  </FormControl>
                </Form.Group>
                <Button type='submit' variant='primary' style={{marginTop:'12px', backgroundColor: '#82197b'}}>Submit</Button>
              </Form>
            ): <Message>Please 
              <Link to='/login'> sign in </Link>
              to write a review</Message>}
          </ListGroupItem>
           </ListGroup>
         </Col>
    </Row>
    </>
}

    </>
  ) 
}

export default ProductScreen
