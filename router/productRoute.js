import express from'express';
import {isAdmin, requireSignIn} from '../middleware/authMiddleware.js'
import {braintreeController, braintreePayment, createProduct, deleteProduct, getProduct, getSingleProduct, photoProduct, productCategory, productCount, productFilter, ProductPerPage, relatedProduct, searchProduct, updateProduct} from '../controller/productController.js'
import formidable from 'express-formidable';
import braintree from 'braintree';

const router = express.Router();

router.post('/create-product',requireSignIn,isAdmin,formidable(),createProduct);
router.put("/update-product/:pid",requireSignIn,isAdmin,formidable(),updateProduct);
router.get('/get-product',getProduct);
router.get('/get-product/:slug',getSingleProduct);
router.get('/product-photo/:pid',photoProduct);
router.delete('/delete-product/:pid',requireSignIn,isAdmin,deleteProduct);
router.post('/product-filter' , productFilter);
router.get('/product-count',productCount);
router.get('/product-list/:page',ProductPerPage)
router.get('/search/:keyword',searchProduct)
router.get('/related-product/:pid/:cid',relatedProduct)
router.get('/product-category/:slug',productCategory)

// Payment route
router.get('/braintree/token' , braintreeController)
router.post('/braintree/payment',requireSignIn,braintreePayment)

export default router;