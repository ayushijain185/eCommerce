import React from 'react'
import {Link} from 'react-router-dom'
import { BsCart4 } from "react-icons/bs";
import { useAuth } from '../../context/auth';
import useCategory from '../../hooks/useCategory';
import SearchInput from '../form/SearchInput';
import { useCart } from '../../context/Cart';
import {Badge} from 'antd'
const Header = () => {
  const [auth,setAuth]=useAuth()
  const [cart]=useCart()
  const category=useCategory()
  const handleLogout=()=>{
    setAuth({...auth , user:null , token:""})
    localStorage.removeItem('auth')
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/"><BsCart4 /> Innovation Mart</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className='row ms-auto'>
            <div className="col-md-5"><SearchInput className='w-100' /></div>
            <div className="col-md-5">
            <ul className="navbar-nav mb-2  mx-10 mb-lg-0">
             
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>

              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to={'/categories'} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Categories
                </Link>
               <ul className="dropdown-menu">

                  {category?.map((c) => (
                    <li>
                      <Link
                        className="dropdown-item"
                        to={`/category/${c.slug}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                
              </li>
              
              {
                !auth.user ? (<>
                <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                </>) :
                (<>
                  <li className="nav-item dropdown">
                      <Link className="nav-link dropdown-toggle" to="" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                       {auth?.user?.name}
                      </Link>
                      <ul className="dropdown-menu">
                        <li><Link className="dropdown-item" to={`/dashboard/${
                          auth?.user?.role==='ADMIN' ? "admin" : "user"
                          }`} >Dashboard</Link></li>
                        
                        <li><Link onClick={handleLogout} className="dropdown-item" to="/">Logout</Link></li>
                             
                      </ul>
                    </li>
                  </>)
              }
             
             <li className="nav-item mt-1">
                <Badge count={cart.length} showZero>
                <Link className="nav-link" to="/cart">Cart</Link>
                </Badge>
                
              </li>
            </ul>
            </div>
          </div>
          
          </div>
        </div>
      </nav>

    </>
  )
}

export default Header;