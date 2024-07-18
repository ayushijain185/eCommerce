import React ,{useState , useEffect} from 'react'
import Layout from '../components/layout/Layout'
import { useParams ,useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast'
import { useCart } from '../context/Cart'
import axios from 'axios'

const CategoryProduct = () => {
    const [product,setProduct]=useState([])
    const [category,setCategory]=useState([])
    const [cart , setCart]=useCart([]);
    const params=useParams()
    const navigate = useNavigate();
    useEffect(()=>{
        if(params?.slug)getProductByCategory();
    },[params?.slug])
    const getProductByCategory = async()=>{
        try{
            const {data}=await axios.get(`/api/v1/product/product-category/${params.slug}`)
            setProduct(data?.product)
            setCategory(data?.category)
        }catch(err){
            console.log(err)
        }
    }
  return (
    <Layout>
        <div className="container mt-3">
            
            <h3 className='text-center'>Category - {category.name}</h3>
            <h3 className='text-center'>{product?.length} Result Found</h3>
            <div className="d-flex flex-wrap justify-content-evenly">
            {product?.map(p=>(
                    <div className="card m-2" style={{width: '18rem'}} key={p._id}>
                        <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                        <div className="card-body">
                            <h5 className="card-title">{p.name}</h5>
                            <p className="card-text">{p.description.substring(0,30)}....</p>
                            <p className="card-text"> {p.price} Rs</p>
                            <button className="btn btn-primary ms-1" onClick={()=>navigate(`/product/${p.slug}`)}>More Details</button>
                            <button className="btn btn-secondary ms-1" 
                            onClick={()=>{
                              setCart([...cart , p])
                              localStorage.setItem('cart',JSON.stringify([...cart,p]))
                              toast.success('Item added to Cart')
                              }}>ADD TO CART</button>
                        </div>
                    </div>
                ))}
          </div>
        </div>
      
    </Layout>
  )
}

export default CategoryProduct
