import {useEffect , useState} from 'react';
import axios from 'axios';
export default function useCategory(){
    const [category , setCategory]=useState([]);
    const getCategory=async(req,res)=>{
        try{
            const {data}=await axios.get('/api/v1/category/get-category')
            setCategory(data?.category)
            console.log(data)

        }catch(err){
            console.log(err)

        }
    }
    useEffect(()=>{
        getCategory();
    },[])
    return category;
}