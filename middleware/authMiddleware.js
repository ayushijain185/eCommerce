import JWT from 'jsonwebtoken';
import User from '../models/userModel.js';
export const requireSignIn =async(req,res,next)=>{
    try{
        const decode = JWT.verify(req.headers.authorization,process.env.JWT_SECRET);
        req.user=decode;
        next();
    }
    catch(err){
        console.log(err);
    }

}

export const isAdmin = async(req,res,next)=>{
    try{
        const user =await User.findById(req.user._id)
        if(user.role !=="ADMIN"){
            return res.status(401).send({
                success:false,
                message:"unAuthorized Access"
            })
        }
        else{
            next();
        }

    }catch(err){
        console.log(err);
        res.status(500).send({
            success:false,
            message:"unAuthorized Access"
        })

    }
}