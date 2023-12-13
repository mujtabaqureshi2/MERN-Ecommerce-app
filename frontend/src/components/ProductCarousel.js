import React, { useEffect } from 'react'
import {Link} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import  Loader from './Loader'
import Message from './Message'
import { Carousel, Image} from 'react-bootstrap'
import { getTopRatedProducts } from '../actions/productActions'


const ProductCarousel = () => {
  const topRatedProducts = useSelector(state => state.topRatedProducts)
  const {loading, error, products} = topRatedProducts
   const dispatch =useDispatch()
  useEffect(()=> {
    dispatch(getTopRatedProducts())
  },[dispatch])

  return   error ? <Message variant='danger'>{error}</Message> :(
    <Carousel pause='hover' className='bg-dark'>
      {products.map(product => (
        <Carousel.Item key={product._id}>
          <Link to={`product/${product._id}`}>
            <Image src={product.image}  fluid/>
            <Carousel.Caption className='carousel-caption'>
            <h4>{product.name} (${product.price})</h4>
            </Carousel.Caption>  
          </Link>
          </Carousel.Item>

      ))}

    </Carousel>
   )
  
}

export default ProductCarousel