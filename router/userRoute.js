import {Router} from 'express';
import { allOrder, forgotPassword, getOrder, orderStatusController, updateProfile, userLogin, userRegister } from '../controller/userController.js';
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js';
const route = Router();

route.post('/register',userRegister);
route.post('/login',userLogin);
route.post('/forgot-password',forgotPassword);
route.get('/user-auth',requireSignIn,(req,res)=>{
    res.status(200).send({ok:true})
})
route.get('/admin-auth',requireSignIn,isAdmin,(req,res)=>{
    res.status(200).send({ok:true})
})
route.put('/profile',requireSignIn,updateProfile)

route.get('/orders',requireSignIn,getOrder)
route.get('/all-orders',requireSignIn,isAdmin , allOrder)
route.put('/order-status/:orderId',requireSignIn,isAdmin , orderStatusController)

export default route;