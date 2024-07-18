import express from 'express';
import cors from 'cors';
import colors from 'colors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv';
dotenv.config();
import connectivity from './config/db.js';
const app= express();
import userRoute from './router/userRoute.js';
import categoryRoute from './router/categoryRoute.js';
import productRoute from './router/productRoute.js';
connectivity();
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin:[process.env.FRONTED_URL],
    credentials:true
}))

app.use('/api/v1/user',userRoute);
app.use('/api/v1/category',categoryRoute);
app.use('/api/v1/product',productRoute);
const PORT=process.env.PORT || 8000
app.listen(PORT , ()=>{
    console.log(`server running on ${process.env.DEV_NODE} node http://localhost:${PORT}`.bgCyan.white)
})
