import React,{useState} from 'react'
import Layout from '../../components/layout/Layout'
import "../../style/authStyle.css";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate,useLocation } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [question, setQuestion] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [loading , setLoading]=useState(false);
    const navigate = useNavigate(); 
    const location = useLocation();
    const handleSubmit=async(e)=>{
        e.preventDefault();
        setLoading(true);
        try{
            const res = await axios.post("/api/v1/user/forgot-password", { email,question, newPassword });
            if (res && res.data.success) {
              toast.success(res.data && res.data.message);
              navigate(location.state || '/login'); 
            } else {
              toast.error(res.data.message);
            }

        }catch(err){
            toast.error('Something went wrong');

        }finally{
            setLoading(false);
        }
    }

    
  return (
    <Layout title='Reset Password - Innovation Mart'>
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <h1 className='title'>Reset Password</h1>
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
                    type="text"
                    className="form-control"
                    id="exampleInputquestion"
                    placeholder='whats your nickname'
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    required
                    />
                </div>
                <div className="mb-3">
                    <input
                    type="password"
                    className="form-control"
                    id="exampleInputpassword"
                    placeholder='New Password'
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    />
                </div>
                <div className='mb-3'>
                    <button type="submit" className="btn btn-dark">{loading ? (
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                    ) : (
                        'Reset'
                    )}</button>
                </div>
                    
            </form>
        </div>
      
    </Layout>
  )
}


export default ForgotPassword;
