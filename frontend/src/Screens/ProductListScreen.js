import React from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import { useEffect } from 'react'
import {Button, Table,Row, Col} from 'react-bootstrap'
import Paginate from '../components/paginate'


import {useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Message from '../components/Message'
import Loader from '../components/Loader' 
import { useParams } from 'react-router-dom'

import { listProducts } from '../actions/productActions'
import { productDelete } from '../actions/productActions'
import { productCreate } from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

const ProductListScreen = () => {
  const dispatch = useDispatch()
  const history = useNavigate()
  const {pageNumber} = useParams() 

  const deleteHandler= (id) => {
    if(window.confirm('Are you sure')) {
      // Delete Products
      dispatch(productDelete(id))
    }
   
  }

  const createProductHandler = () => {
    dispatch(productCreate())
  }

  const productList = useSelector(state => state.productList)   
  const {loading, error, products, page, pages} = productList

  const deleteProduct = useSelector(state => state.productDelete)   
  const {loading: loadingDelete, error: errorDelete, success: successDelete} = deleteProduct

  const createProduct = useSelector(state => state.productCreate)   
  const {loading: loadingCreate, error: errorCreate, success: successCreate, product:createdProduct} = createProduct

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin 

  useEffect(()=> {
    dispatch({type: PRODUCT_CREATE_RESET})

    if(!userInfo.isAdmin){
      history('/')
    } 

    if(successCreate) {
      history(`/admin/product/${createdProduct._id}/edit`)
    } else {
      dispatch(listProducts('', pageNumber )) 
    }
   
  },[dispatch,history,userInfo,successDelete, successCreate,pageNumber]) 
  
  return (
    <>
    <Row className='align-items-center'>
      <Col>
      <h1>Product List</h1>
      </Col>
      <Col className='text-right'>
        <Button className='my-3' onClick={createProductHandler} style={{backgroundColor:'#82197b'}}>
          <i className='fas fa-plus'></i><span style={{paddingLeft: '3px'}}>CreateProduct</span></Button>
      </Col>

    </Row>

    {loadingDelete && <Loader/> }   
    {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

    {loadingCreate && <Loader/> }   
    {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
   

    {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message>: (

      <Table striped hover resposive className='table-sm'>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>CATEGORY</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map(product =>(
                <tr id={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.brand}
                    </td>
                    <td>
                      <LinkContainer to={`/admin/product/${product._id}/edit`} style={{marginRight: '3px'}}> 
                        <Button variant='light' className='btn-sm'>
                            <i className='fas fa-edit'></i>
                        </Button>
                      </LinkContainer>
                      <Button variant='danger' className='btn-sm' onClick={()=>
                       deleteHandler(product._id) 
                  }> <i className='fas fa-trash'></i>
                      </Button>
                    </td>
                </tr>
          ))}
        </tbody>

      </Table>
    )}

{!loading && <Paginate pages={pages} page={page} isAdmin={true}></Paginate>  }  
    </>
  )
}

export default ProductListScreen