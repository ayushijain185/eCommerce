import User from "../models/userModel.js";
import JWT from "jsonwebtoken";
import { comparePassword, hashPassword } from '../utils/authUtils.js'
import orderModel from "../models/orderModel.js";

export const userRegister = async (req, res) => {
    try {
        const { email, name, password, phone, address ,question} = req.body;
        console.log('Request body:', req.body); 
        if (!email || !name || !password || !phone || !address || !question) {
            return res.status(400).send({success:false,message:'All fields are required'});
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ success:false , message:"User already exists"});
        }

        const hashedPassword = await hashPassword(password);
        console.log(hashedPassword)
        const newUser = new User({ 
            name, 
            email, 
            phone, 
            address, 
            password: hashedPassword ,
            question
        });

        await newUser.save();
        newUser.password=undefined;
        res.status(200).json({
            success: true,
            message: 'User registered successfully',
            newUser
        });

    } catch (err) {
        console.error('Error registering user:', err);
        res.status(500).send({success:false ,message: 'Something went wrong'});
    }
}


export const userLogin=async(req,res)=>{
    try{
        const {email , password}=req.body;
        if(!email || !password){
            res.status(400).send('All field are required')
        }

        const user =await User.findOne({email});
        if(!user){
            res.status(400).send('user Not exist')
        }
        const match = await comparePassword(password,user.password)
        if(!match){
            res.status(400).send('Invalid email and password')
        }
        const token = JWT.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"3d"})
        user.password=undefined;
        res.status(200).send({
            success:true,
            message:'logged In successfully',
            user,
            token

        })
    }catch(err){
        console.log(err);
        res.status(500).send('something went wronge')
    }
    
}


export const forgotPassword=async(req,res)=>{
    try{
        const {email,question,newPassword}=req.body
        if(!email || !question || !newPassword){
            res.status(400).send({success:true,message:'All filed are required'})
        }
        const user = await User.findOne({email,question});
        if(!user){
            res.status(400).send({success:false,message:'Email or Answer does not match'})
        }
        const hashed=await hashPassword(newPassword);
        await User.findByIdAndUpdate(user._id,{password:hashed})
        res.status(200).send({
            success:true,
            message:"password Reset Successfully"
        })

    }catch(err){
        res.status(500).send({success:false,message:'something went wronge',err})
    }

}
export const updateProfile=async(req,res)=>{
    try{
        const {name,email,address,phone}=req.body
        const user = User.findById(req.user._id)
        const updatedUser=await User.findByIdAndUpdate(req.user._id,{name:name || user.name ,address:address || user.address , phone :phone || user.phone , email:user.email})
        res.status(200).send({
            success:true,
            message:'user updated successfully',
            updatedUser
        })

    }catch(err){
        res.status(400).send({
            success:false,
            message:'something went wronge'

        })
    }

}

export const getOrder=async(req,res)=>{
    try {
        const orders = await orderModel
          .find({ buyer: req.user._id })
          .populate("products", "-photo")
          .populate("buyer", "name");
        res.json(orders);
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Error WHile Geting Orders",
          error,
        });
      }
}

export const allOrder=async(req,res)=>{
    try {
        const orders = await orderModel
          .find({})
          .populate("products", "-photo")
          .populate("buyer", "name")
          .sort({ createdAt: -1 });
        res.json(orders);
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Error WHile Geting Orders",
          error,
        });
      }
}

export const orderStatusController = async (req, res) => {
    try {
      const { orderId } = req.params;
      const { status } = req.body;
      const orders = await orderModel.findByIdAndUpdate(
        orderId,
        { status },
        { new: true }
      );
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error While Updateing Order",
        error,
      });
    }
  };