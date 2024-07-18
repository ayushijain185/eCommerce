import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]); // Initialize as an empty array
  
  useEffect(() => {
    if (params?.slug) {
      getProduct();
    }
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`);
      setProduct(data?.product);
      getSimilarProducts(data?.product._id, data?.product?.category._id);
    } catch (err) {
      console.log(err);
    }
  };

  const getSimilarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(`/api/v1/product/related-product/${pid}/${cid}`);
      setRelatedProducts(data?.products || []); // Ensure it's an array
    } catch (err) {
      console.log(err);
    }
  };

  if (!product) {
    return <div>Loading...</div>; // Or a spinner/placeholder while loading the product
  }

  return (
    <Layout>
      <div className="row container mt-4">
        <div className="col-md-4 mx-3">
          <img
            src={`/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            height="300"
            width={"350px"}
          />
        </div>
        <div className="col-md-5 my-4 mx-3">
          <h2>Product Details</h2>
          <h6 className='ms-1'>Name : {product.name}</h6>
          <h6 className='ms-1'>Description : {product.description}</h6>
          <h6 className='ms-1'>Price : {product.price}</h6>
          <h6 className='ms-1'>Category : {product?.category?.name}</h6>
          <button className="btn btn-secondary ms-1 mt-1">ADD TO CART</button>
        </div>
      </div>
      <hr />
      <div className="row container">
        <h6>Similar Products</h6>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="d-flex flex-wrap">
        {relatedProducts?.map(p=>(
                    <div className="card m-2" style={{width: '18rem'}} key={p._id}>
                        <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                        <div className="card-body">
                            <h5 className="card-title">{p.name}</h5>
                            <p className="card-text">{p.description.substring(0,30)}....</p>
                            <p className="card-text"> {p.price} Rs</p>
                            <button className="btn btn-primary ms-1" onClick={()=>navigate(`/product/${p.slug}`)}>More Details</button>
                            <button className="btn btn-secondary ms-1">ADD TO CART</button>
                        </div>
                    </div>
                ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
