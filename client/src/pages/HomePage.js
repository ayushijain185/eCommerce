import Layout from '../components/layout/Layout'
import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {useCart} from '../context/Cart';
import { Checkbox, Radio } from "antd";


import { Prices } from '../components/Prices';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
const HomePage = () => {
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [cart , setCart]=useCart([]);
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate()

 

  const getAllCategory=async()=>{
    try{
      const {data}=await axios.get('/api/v1/category/get-category')
      if(data.success){
        setCategory(data.category);
      }
    }catch(err){
      console.log(err);
    }
  }
  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  const getAllProducts=async()=>{
    try{
      setLoading(true)
      const {data}=await axios.get(`api/v1/product/product-list/:${page}`)
      setProduct(data?.product);
      setLoading(false)
    }catch(err){
      setLoading(false);
      console.log(err)
    }
  }


  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProduct([...product, ...data?.product]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const handleFilter=(value,id)=>{
    let all = [...checked]
    if(value){
      all.push(id)
    }
    else{
      all = all.filter(c=>c!==id);
    }
    setChecked(all);

  }
  useEffect(()=>{
    if(!checked.length || !radio.length) getAllProducts();
  },[checked.length ,radio.length]);

  useEffect(()=>{
    if(checked.length || radio.length)filterProduct();
  },[checked , radio])

  const filterProduct = async () => {
      try {
        const { data } = await axios.post("/api/v1/product/product-filter", {
          checked,
          radio,
        });
        setProduct(data?.product);
      } catch (error) {
        console.log(error);
      }
  };
  return (
    <Layout title='Best Offers'>
     <div className="container-fluid row mt-3">
        <div className="col-md-2 p-1">
        <h6 className="text-center">Filter By Category</h6>
        <hr/>
        <div className="d-flex flex-column m-3">
          {category?.map(c=>(
           <Checkbox key={c._id} onChange={(e) =>handleFilter(e.target.checked,c._id)} >{c.name}</Checkbox>
        ))}
        </div>
        <h6 className="text-center">Filter By Price</h6>
        <hr />
        <div className="d-flex flex-column m-3">
          <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
          </Radio.Group>

        </div>
        <div className="d-flex flex-column">
            <button
              className="btn btn-dark"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
      </div>
      <div className="col-md-10">
          <h4 className="text-center">All Products</h4>
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
           <div className="m-2 p-3">
            {product && product.length < total && (
              <button className="btn btn-warning" onClick={(e) => { 
                e.preventDefault(); 
                setPage(page + 1);
              }}>
              {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
