import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// desc@     Fetch all prodcts
//route      GET /api/products
//access     Public

const getProducts = asyncHandler( async(req, res) => {
    const pageSize = 10
    const page = Number(req.query.pageNumber) || 1
    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options:'i'
        }
    } : {}
    const count = await Product.count({...keyword})
    const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page -1))
    res.json({products, page, pages: Math.ceil(count / pageSize)}) 
})

// desc@     Fetch single product by id
//route      GET /api/products
//access     Public

const getProductById = asyncHandler( async(req, res) => {
    const product = await Product.findById(req.params.id)
   
    if(product){
        res.json(product)
    } 
    else 
    {
        res.status(404)
        throw new Error('Product Not Found')
    }
})

// desc@     Fetch single product by id
//route      GET /api/products
//access     Public

const deleteProductById = asyncHandler( async(req, res) => {
    const product = await Product.findById(req.params.id)
   
    if(product){
        product.deleteOne()
        res.json({message: 'Product Removed'})
    } 
    else 
    {
        res.status(404)
        throw new Error('Product Not Found')
    }
})



// desc@     Fetch single product by id
//route      GET /api/products
//access     Private/admin

const createProduct = asyncHandler( async(req, res) => {
    const product = new Product({
        name: 'Smaple name',
        price: 0,
        description: 'Sample Description',
        image: '/images/sample.jpg',
        brand: 'Sample Brand',
        user: req.user._id,
        category: 'Sample Category',
        countInStock: 0,
        numReviews: 0,
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})

const updateProduct = asyncHandler( async(req, res) => {
    
    const {
        name,
        description,
        countInStock,
        brand,
        category,
        image,
    numReviews,
        price
    } = req.body

    const product = await Product.findById(req.params.id)

    if (product) {
        product.name = name,
        product.description = description,
        product.countInStock = countInStock,
        product.brand = brand,
        product.category = category,
        product.price = price,
        product.image = image

    }

    

    const updatedProduct = await product.save()
    res.status(201).json(updatedProduct)
})


const createdProductReviews = asyncHandler( async(req, res) => {
    
    const {rating, comment} = req.body
 
   
 
     const product = await Product.findById(req.params.id)
 
     if (product) {
        const alreadyReviewed = product.reviews.find(r => r.user.toString()=== req.user._id.toString() )
 
        if (alreadyReviewed) {
         res.status(400)
         throw new Error('Product Already reviewed')
        }
        const review = {
         name: req.user.name,
         rating: Number(rating),
         comment,
         user: req.user._id
        }
        product.reviews.push(review)
        product.numReviews=product.reviews.length;
        product.rating = product.reviews.reduce((acc,item)=> item.rating + acc,0)
        / product.reviews.length
 
        await product.save()
        res.status(201).json({message: 'Review added'})
 
     } else {
         res.status(404)
         throw new Error("Product not found")
        
     } }) 

     const getTopProducts = asyncHandler( async(req, res) => {
         const products = await Product.find({}).sort({rating:-1}).limit(3)

         res.json(products)
        
       }) 






export {
    getProducts,
    getProductById,
    deleteProductById,
    createProduct,
    updateProduct,
    createdProductReviews,
    getTopProducts
} 

