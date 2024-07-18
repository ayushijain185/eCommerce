import categoryModel from "../models/categoryModel.js"
import slugify from 'slugify';
export const createCategory = async(req,res)=>{
    try{
        const {name}=req.body
        if(!name){
            return res.status(400).send({
                success:false,
                message:'Name is required'
            })
        }
        const existCategory = await categoryModel.findOne({name});
        if(existCategory){
            return res.status(400).send({
                success:false,
                message:'Category Already exist'
            })

        }
        const category= await new categoryModel({name,slug:slugify(name)})
        await category.save();
        res.status(200).send({
            success:true,
            message:'category created successfully',
            category
        })

    }catch(err){
        res.status(500).send({
            success:false,
            err,
            message:'Error in category'
        })
    }

}

export const updateCategory=async(req,res)=>{
    try{
        const {name}=req.body
        const id=req.params.id
        if(!name){
            res.status(400).send({
                success:false,
                message:"All field are required"
            })
        }

        const newCategory= await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true});
        res.status(200).send({
            success:true,
            message:"Category Updated Successfully",
            newCategory
        })


    }catch(err){
        console.log(err)
        res.status(500).send({
            success:false,
            message:"something went wronge"
        })
    }
}

export const getCategory=async(req,res)=>{
    try{
        const category= await categoryModel.find({});
        res.status(200).send({
            success:true,
            message:"All category List",
            category
        })

    }catch(err){
        console.log(err)
        res.status(500).send({
            success:false,
            message:"something went wronge"
        })
    }

}

export const singleCategory=async(req,res)=>{
    try{
        const slug = req.params.slug;
        const category= await categoryModel.findOne({slug});
        res.status(200).send({
            success:true,
            message:"Category Details",
            category
        })

    }catch(err){
        console.log(err)
        res.status(500).send({
            success:false,
            message:"something went wronge"
        })
    }

}

export const deleteCategory=async(req,res)=>{
    try{
        const id = req.params.id;
        const category= await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success:true,
            message:"Category Deleted Successfully",
            category
        })

    }catch(err){
        console.log(err)
        res.status(500).send({
            success:false,
            message:"something went wronge"
        })
    }

}

