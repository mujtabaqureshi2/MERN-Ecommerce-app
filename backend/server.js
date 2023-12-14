import express from 'express';
import path from 'path'
import dotenv from 'dotenv'; 
import {notFound, errorHandler} from './middleware/errorMiddleware.js'
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import morgan from 'morgan';



dotenv.config();
const app = express();
app.use(express.json())

if(process.env.NODE_ENV ===  'development') {
    app.use(morgan('dev'))
}




app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '/frontend/build')))

    app.get('*',(req,res)=> res.sendFile(path.resolve(__dirname,'frontend', 'build', 'index.html')))
} else {
    app.get('/', (req,res) => {
        res.send("API is running...")
    })
}

app.get('/api/config/paypal',(req,res)=> res.send(process.env.PAYPAL_CLIENT_ID) )

app.use(notFound)

app.use(errorHandler)






const PORT = process.env.PORT || 3000 ;

connectDB()
    .then(() => {
        // Connection to MongoDB is successful, listen for requests
        app.listen(PORT, () => {
            console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });

app.listen(PORT, console.log(`Server is runnning in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)); 
