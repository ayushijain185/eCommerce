import fs from 'fs';
import productModel from '../models/productModel.js';
import categoryModel from '../models/categoryModel.js'
import orderModel from '../models/orderModel.js';
import slugify from 'slugify';
import dotenv from 'dotenv';
dotenv.config();
import braintree from 'braintree';
var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.MERCHANT_ID,
    publicKey: process.env.PUBLIC_KEY,
    privateKey: process.env.PRIVATE_KEY,
  });

export const createProduct=async(req,res)=>{
    try{
        const {name,description,category,price,quantity}=req.fields;
        const {photo}=req.files
        if(!name || !description || !category || !price || !quantity){
            return res.status(400).send({
                success:false,
                message:'All Field are required'
            })
        }
        if(photo && photo.size>1000000){
            return res.status(400).send({
                success:false,
                message:'Image size is too large'
            })
        }
        const product = new productModel({...req.fields,slug : slugify(name)});
        if(photo){
            product.photo.data=fs.readFileSync(photo.path)
            product.photo.contentType=photo.type
        }
        await product.save();
        return res.status(200).send({
            success:true,
            message:'Product created successfully',
            product
        })
    }catch(err){
        return res.status(500).send({
            success:false,
            err,
            message:'something went wronge'
        })
    
    }

}

export const getProduct=async(req,res)=>{
    try{
        const product = await productModel.find({}).select("-photo").populate('category').limit(12).sort({createAt:-1})
        return res.status(200).send({
            success:true,
            totalCount:product.length,
            message:"Product",
            product
        })

    }catch(err){
        return res.status(500).send({
            success:false,
            message:"something went wronge"
        })
    }


}
export const getSingleProduct=async(req,res)=>{
    try{
        const slug = req.params.slug;
        const product = await productModel.findOne({slug}).select("-photo").populate("category")
        return res.status(200).send({
            success:true,
            message:"Product list",
            product
        })

    }catch(err){
        console.log(err)
        return res.status(500).send({
            success:false,
            message:"something went wronge"
        })
    }

}


export const photoProduct=async(req,res)=>{
    try{
        const product = await productModel.findById(req.params.pid).select("photo")
        if (product && product.photo && product.photo.data) {
            res.set('Content-Type', product.photo.contentType);
            return res.status(200).send(product.photo.data);
          } 

    }catch(err){
        console.log(err)
        return res.status(500).send({
            success:false,
            message:"something went wronge"
        })
    }

}

export const updateProduct=async(req,res)=>{
    try{
        const {name,description,category,price,quantity}=req.fields;
        const {photo}=req.files
        if(!name || !description || !category || !price || !quantity){
            return res.status(400).send({
                success:false,
                message:'All Field are required'
            })
        }
        if(photo && photo.size>1000000){
            return res.status(400).send({
                success:false,
                message:'Image size is too large'
            })
        }
        const product = await productModel.findByIdAndUpdate(req.params.pid,{...req.fields , slug :slugify(name)},{new:true});
        if(photo){
            product.photo.data=fs.readFileSync(photo.path)
            product.photo.contentType=photo.type
        }
        await product.save();
        return res.status(200).send({
            success:true,
            meassage:"product updated successfully",
            product


        })
            
    }

    catch(err){
        console.log(err)
        return res.status(500).send({
            success:false,
            message:"something went wronge"
        })
    }

}

export const deleteProduct=async(req,res)=>{
    try{
        const product = await productModel.findByIdAndDelete(req.params.pid)
        return res.status(200).send({
            success:true,
            meassage:"product deleted successfully"
        })
    

    }catch(err){
        return res.status(500).send({
            success:false,
            message:"something went wronge"
        })
    }
    
}

export const productFilter = async(req,res) =>{
    try{
        const {checked,radio}=req.body;
        let args={}
        if(checked.length>0 ){
            args.category=checked
        }
        if(radio.length)args.price={$gte:radio[0],$lte:radio[1]}
        const product = await productModel.find(args);
        res.status(200).send({
            success:true,
            message:'filter successfull',
            product
        })

    }catch(error){
        res.status(400).send({
            succes:false,
            message:'something went wronge',
            error
        })
    }

}

export const productCount =async(req,res)=>{
    try{
        const total= await productModel.find({}).estimatedDocumentCount()
        res.status(200).send({
            success:true,
            message:'count item successfully',
            total
        })

    }catch(err){
        res.status(400).send({
            success:false,
            message:'something went wronge',
            err
        })
    }

}

export const ProductPerPage=async(req,res)=>{
    try{
        const perpage=10;
        const page = req.params.page?req.params.page : 1
        const product = await productModel.find({}).select('-photo').skip((page-1)*perpage).limit(perpage).sort({createdAt :-1})
        res.status(200).send({
            succes:true,
            message:'product fetched',
            product
        })
    }catch(err){
        res.status(400).send({
            success:false,
            message:'error in per page',
            err
        })
    }
}


export const searchProduct=async(req,res)=>{
    try{
        const {keyword}=req.params;
        const result = await productModel.find({
            $or:[
                {name:{$regex:keyword , $options:"i"}},
                {description:{$regex:keyword , $options:"i"}},
            ]
        }).select("-photo")
        res.json(result);

    }catch(err){
        console.log(err);
        res.status(400).send({
            success:true,
            message:'search Product',
            err
        })
    }

}

export const relatedProduct=async(req,res)=>{
    try{
        const {pid , cid}=req.params;
        const products = await productModel.find({
            category: cid,
            _id: { $ne: pid },
          })
          .select("-photo")
          .limit(3)
          .populate("category");
          console.log(products)
        res.status(200).send({
            success:true,
            message:'fetched related product',
            products
        })

    }catch(err){
        res.status(400).send({
            success:false,
            message:'error in getting related product',
            err
        })
    }
} 

export const productCategory=async(req,res)=>{
    try{
        const category = await categoryModel.findOne({slug:req.params.slug});
        const product = await productModel.find({category}).populate('category')
        res.status(200).send({
            success:true,
            message:'prodct by category',
            category,
            product
        })
        

    }catch(err){
        res.status(400).send({
            success:false,
            message:'error while getting product',
            err
        })
    }

}

export const braintreeController=async(req,res)=>{
    try{
        gateway.clientToken.generate({},function(err,response){
            if(err){
                res.status(500).send(err)
            }
            else{
                res.send(response)
            }
        })

    }catch(err){
        console.log(err)
    }
}

export const braintreePayment=async(req,res)=>{
    try{
        const {cart , nonce}=req.body
        let total=0;
        cart.map(i=>{total=total+i.price})
        let newTransaction = gateway.transaction.sale({
            amount:total,
            paymentMethodNonce:nonce,
            options:{
                submitForSettlement:true
            }
        },
        function(error,result){
            if(result){
                const order = new orderModel({
                    products:cart,
                    payment:result,
                    buyer:req.user._id,

                }).save()
                res.json({ok:true})

                
            }else{
                res.status(500).send(error)
            }
        }
    )
       

    }catch(err){
        console.log(err)
    }

}