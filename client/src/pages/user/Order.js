import React,{useState,useEffect} from 'react'
import Layout from '../../components/layout/Layout'
import UserMenu from '../../components/layout/UserMenu'
import axios from 'axios';
import { useAuth } from '../../context/auth';
import moment from 'moment'

const Order = () => {
  const [orders , setorders]=useState();
  const [auth , setAuth]=useAuth()
  const getOrder = async()=>{
    try{
      const {data}=await axios.get('/api/v1/user/orders')
      setorders(data)

    }catch(err){
      console.log(err)

    }

  }
  useEffect(()=>{if(auth?.token) getOrder()},[auth?.token])
  return (
    <Layout title ="Orders - Innovation Mart">
    <div className="container-fluid m-3 p-3">
    <div className='row'>
        <div className="col-md-3">
            <UserMenu />
        </div>
        <div className="col-md-8">
            <h1 className='text-center'>Orders</h1>
            {
              orders?.map((o,i)=>{
                return(
                  <div className='border shadow'>
                    <table className='table'>
                      <thead>
                        <tr>
                          <td scope='col'>No.</td>
                          <td scope='col'>Status</td>
                          <td scope='col'>Buyer</td>
                          <td scope='col'>Order Date</td>
                          <td scope='col'>Payment</td>
                          <td scope='col'>quantity</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{i+1}</td>
                          <td>{o?.status}</td>
                          <td>{o?.buyer?.name}</td>
                          <td>{moment(o?.createdAt).fromNow()}</td>
                          <td>{o?.payment.success ? "success":"failed"}</td>
                          <td>{o?.products?.length}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="container">
            {o?.products.map((p,i) => (
              <div className="row mb-2 p-3 card flex-row">
                <div className="col-md-4">
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    width="100px"
                    height={"100px"}
                  />
                </div>
                <div className="col-md-8">
                  <p>{p.name}</p>
                  <p>{p.description.substring(0, 30)}</p>
                  <p>Price : {p.price}</p>
                  
                </div>
              </div>
            ))}
          </div>
                  </div>
                )

})
            }

        </div>

        
    </div></div>

</Layout>
  )
}

export default Order
