import React,{useState,useEffect} from 'react'
import Layout from '../../components/layout/Layout'
import UserMenu from '../../components/layout/UserMenu'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import toast from 'react-hot-toast';
import axios from 'axios';
const Profile = () => {
  const [name , setName] = useState("");
    const [email , setEmail] = useState("");
    const [address , setAddress] = useState("");
    const [phone , setPhone] = useState("");
    const [loading , setLoading]=useState(false);
    const [auth,setAuth]=useAuth();
    const navigate =useNavigate();

    useEffect(()=>{
      const {email,name,phone,address}=auth?.user
      setName(name)
      setEmail(email)
      setAddress(address)
      setPhone(phone)
    },[auth?.user])
    const handleSubmit = async (e)=>{
      e.preventDefault()
      setLoading(true);
      try{
          const {data} = await axios.put("/api/v1/user/profile" ,{name,email,address,phone} )
        if(data.error) toast.error(data.message)
        else setAuth({...auth , user:data?.updatedUser})
        let ls=localStorage.getItem("auth")
        ls=JSON.parse(ls)
        ls.user=data.updatedUser
        localStorage.setItem("auth",JSON.stringify(ls))
        toast.success('profile updated successfully')
  
      }catch(err){
          console.log(err);
          toast.error('Something went wronge');
  
      }
      finally{
          setLoading(false);
      }
  }
  return (
    <Layout title ="Dashboard - Innovation Mart">
    <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
              <div >
            
            <form onSubmit={handleSubmit}>
                <h4 className='title'>User Profile</h4>
                <div className="mb-3">
                        <input type="email" className="form-control" id="exampleInputEmail" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} disabled  />
                    </div>
                    <div className="mb-3">
                        <input type="text" className="form-control" id="exampleInputName" placeholder='Name' value={name} onChange={(e)=> setName(e.target.value)} />
                    </div>
                    
                    <div className="mb-3">
                        <input type="text" className="form-control" id="exampleInputtext"  placeholder='Address' value={address} onChange={(e)=>setAddress(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <input type="text" className="form-control" id="exampleInputphone" placeholder='Phone no.' value={phone} onChange={(e)=>setPhone(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-dark">{loading ? (
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />

            ) : (
              'Update'
            )}</button>
                
            </form>
            
        </div>
        </div>
        </div>
          </div>
    </Layout>
  )
}

export default Profile
