import React, { useEffect } from 'react'
import {Row,Col} from 'react-bootstrap';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { useParams } from 'react-router-dom';
import Paginate from '../components/paginate';
import Meta from '../components/Meta';
import { Link } from 'react-router-dom';
import ProductCarousel from '../components/ProductCarousel';



const HomeScreen = () => {
 
  const {keyword} = useParams()
 
  const {pageNumber }  = useParams() || 1    
  const productList = useSelector(state => state.productList)
  const  {loading, error, products,pages,page} = productList

  const topRatedProducts = useSelector(state => state.topRatedProducts)
  const {loading:topProductLoading} = topRatedProducts
  
    const dispatch = useDispatch();   
  useEffect(()=>{
    dispatch(listProducts(keyword,pageNumber)) 
    
   }, [dispatch,keyword,pageNumber]);
  

  


  return (
    <>
    <Meta></Meta>
       {!keyword ? <ProductCarousel/> : <Link to='/' className='btn btn-light'> Go Back</Link>}
       {loading && topProductLoading ?( <Loader/>)
       : error ? (<Message variant='danger'>{error}</Message>)
      :   (
        <>
        <h2 className='my-3'>Latest Products</h2>  
      <Row>
       
      {products.map((product)=>(
       <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
           <Product product= {product}/>
           </Col>
       ))}
       
      </Row>  </>) }
      <Paginate page={page} keyword={keyword ? keyword : ''} pages={pages}></Paginate>
      
    </>
  )
  
}

export default HomeScreen
