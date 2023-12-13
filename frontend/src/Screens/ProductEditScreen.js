import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Button,Form,FormGroup,FormControl} from 'react-bootstrap'
import FormContainer from '../components/formContainer'
import { Link } from 'react-router-dom'
import {useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useParams } from 'react-router-dom'
import { listProductDetails } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import { productUpdate } from '../actions/productActions'




const ProductEditScreen = () => {
    const productDetail = useSelector(state => state.productDetail )
    const {loading, error, product} = productDetail

    const updateProduct = useSelector(state => state.productUpdate )
    const {loading: loadingUpdate, error:errorUpdate, success:successUpdate} = updateProduct

  

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState('')
    const [brand, setBrand] = useState('')
    const [uploading, setUploading] = useState(false)

    
    const dispatch = useDispatch()
    const {id} = useParams()
    const history = useNavigate()


    useEffect(()=> {
      if(successUpdate){
        dispatch({type: PRODUCT_UPDATE_RESET})
        history('/admin/productList')
      }else{
        if(!product.name || product._id !== id){
          dispatch(listProductDetails(id))
        } else {
          setName(product.name)
          setPrice(product.price)
          setImage(product.image)
          setCategory(product.category)
          setCountInStock(product.countInStock)
          setBrand(product.brand)
          setDescription(product.description)
        }
      }
        
      
      
        
    },[dispatch,id,product,history,successUpdate]) 

    const uploadFileHandler = async(e) => {
        const file = e.target.files[0]

        if (!file) return;
        const formData = new FormData()
        formData.append('image',file)
        setUploading(true)
        try{
          const config = {
            headers:{
              'Content-Type':'multipart/form-data'
            
              }
            }
            
              const {data} = await axios.post('/api/upload',formData,
              config)
              setImage(data)
              setUploading(false)
              } catch (error){
                console.error(error)
                setUploading(false)

      }
    }

      const submitHandler = (e) => {
          e.preventDefault() 
      dispatch( productUpdate({
          _id:id,
          name,
          price,
          countInStock,
          description,
          image,
          category,
          brand

        }))
        
      }

    return   <>
    <Link className='btn btn-light my-3' to="/admin/productList">Go Back</Link> 
    <FormContainer>
      
      <h1>Edit Product</h1>
      {loadingUpdate && <Loader/>}
      {errorUpdate && <Message>{errorUpdate}</Message>}
    
    {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
      <Form onSubmit= {submitHandler}>
      <FormGroup controlId='name' style={{paddingBottom: '10px'}}>
              <Form.Label>Name</Form.Label>
              <FormControl 
              type='text'
              placeholder='Enter Name'
              value={name}
              onChange={(e)=> setName(e.target.value)}
              >
                  
              </FormControl>
            
          </FormGroup>
  
          <FormGroup controlId='price' style={{paddingBottom: '10px'}}>
              <Form.Label>Price</Form.Label>
              <FormControl 
              type='number'
              placeholder='Price'
              value={price}
              onChange={(e)=> setPrice(e.target.value)}
              >     
              </FormControl>
          </FormGroup>

          <FormGroup controlId='description' style={{paddingBottom: '10px'}}>
              <Form.Label>Description</Form.Label>
              <FormControl 
              type='text'
              placeholder='Description'
              value={description}
              onChange={(e)=> setDescription(e.target.value)}
              >     
              </FormControl>
          </FormGroup>

          <FormGroup controlId='countInStocks' style={{paddingBottom: '10px'}}>
              <Form.Label>In Stock</Form.Label>
              <FormControl 
              type='number'
              placeholder='0'
              value={countInStock}
              onChange={(e)=> setCountInStock(e.target.value)}
              >     
              </FormControl>
          </FormGroup>

          <FormGroup controlId='brand' style={{paddingBottom: '10px'}}>
              <Form.Label>Brand</Form.Label>
              <FormControl 
              type='text'
              placeholder='e.g : samsung'
              value={brand}
              onChange={(e)=> setBrand(e.target.value)}
              >     
              </FormControl>
          </FormGroup>

          <Form.Group controlId='image'>
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.Control style={{display:'flex-row', justifyContent:'space-between'}}
                id='image-file'
                type = 'file'
                label='Choose File'
                custom
                onChange={uploadFileHandler}
              ></Form.Control>
              {uploading && <Loader />}
            </Form.Group>


         <FormGroup controlId='category' style={{paddingBottom: '10px'}}>
             <Form.Label>Category</Form.Label>
             <FormControl 
             type='text'
             placeholder='Enter Brand'
             value={category}
             onChange={(e)=> setCategory(e.target.value)}
             >     
             </FormControl>
         </FormGroup>
 
 
         
 
         <Button className='mt-4' type= 'submit'  style={{backgroundColor:'#82197b'}}>Update Product</Button>
     </Form>
   )}

  
</FormContainer>
    </>
 
  
  
}

export default ProductEditScreen
