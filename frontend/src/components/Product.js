import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'

const Product = ({product}) => {
  return (
    <Card className='my-3 p-3 rounded'>
        <Link to ={`/product/${product._id}`}>
         <Card.Img  src={product.image} variaint= 'top'/> 
        </Link>
        <Card.Body>
        <Link to ={`/product/${product._id}`}>
            <strong>{product.name}</strong>
            </Link> 

        <Card.Text as='div'>
            <div className='my-2'>
                <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
            </div>
        </Card.Text>
        <Card.Text as='h3'>
                <div > ${product.price}</div>
        </Card.Text>
            </Card.Body>    
    </Card>
  )
}

export default Product
  