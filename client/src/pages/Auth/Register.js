import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import axios from 'axios';
import toast from 'react-hot-toast';
import "../../style/authStyle.css"
import {useNavigate} from 'react-router-dom'

const Register = () => {
    const [name , setName] = useState("");
    const [email , setEmail] = useState("");
    const [address , setAddress] = useState("");
    const [phone , setPhone] = useState("");
    const [password , setPassword] = useState("");
    const [question , setQuestion]=useState("");
    const [loading , setLoading]=useState(false);
    const navigate =useNavigate();

    const handleSubmit = async (e)=>{
    e.preventDefault()
    setLoading(true);
    try{
        const res = await axios.post("/api/v1/user/register" ,{name,email,password,address,phone,question} )
        if(res && res.data.success) {
            toast.success(res.data && res.data.message);
            navigate('/login')
        }
        else toast.error(res.data.message)

    }catch(err){
        console.log(err);
        toast.error('Something went wronge');

    }
    finally{
        setLoading(false);
    }
}
  return (

    <Layout title='Registration - Innovation Mart'>
        <div className="form-container">
            
            <form onSubmit={handleSubmit}>
                <h4 className='title'>Registration Page</h4>
                
                    <div className="mb-3">
                        <input type="text" className="form-control" id="exampleInputName" placeholder='Name' value={name} onChange={(e)=> setName(e.target.value)} required/>
                    </div>
                    <div className="mb-3">
                        <input type="email" className="form-control" id="exampleInputEmail" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} required  />
                    </div>
                    <div className="mb-3">
                        <input type="text" className="form-control" id="exampleInputtext"  placeholder='Address' value={address} onChange={(e)=>setAddress(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <input type="text" className="form-control" id="exampleInputphone" placeholder='Phone no.' value={phone} onChange={(e)=>setPhone(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <input type="text" className="form-control" id="exampleInputquestion" placeholder='whats your nickname' value={question} onChange={(e)=>setQuestion(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control" id="exampleInputPassword" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn btn-dark">{loading ? (
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />

            ) : (
              'Submit'
            )}</button>
                
            </form>
        </div>
      
    </Layout>
  )
}

export default Register
