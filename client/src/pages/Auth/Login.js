import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import "../../style/authStyle.css";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate,useLocation } from 'react-router-dom';
import { useAuth } from '../../context/auth';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const [loading , setLoading]=useState(false);
  const navigate = useNavigate(); 
  const location = useLocation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/v1/user/login", { email, password });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem('auth',JSON.stringify(res.data))
        navigate(location.state || '/'); 
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error('Something went wrong');
    }
    finally{setLoading(false);}
  };

  return (
    <Layout title='Login - Innovation Mart'>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h1 className='title'>Login Page</h1>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail"
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword"
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
         <div className='mb-3'>
            <button type="submit" className="btn btn-dark">{loading ? (
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
              ) : (
                'Submit'
              )}</button>
            </div>
            <div className='mb-3'>          
            <button type="submit" className="btn btn-link" onClick={()=>{navigate('/forgot-password')}}>Forgot Password</button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
