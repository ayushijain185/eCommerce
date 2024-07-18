import React from 'react'
import Layout from '../../components/layout/Layout'
import UserMenu from '../../components/layout/UserMenu'
import { useAuth } from '../../context/auth'
const Dashboard = () => {
  const [auth]=useAuth()
  return (
    <Layout title='Dashboard - Innovation Mart'>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className='card w-75 p-3'>
              <h4>User : {auth?.user?.name}</h4>
              <h4>Email : {auth?.user?.email}</h4>
              <h4>Address : {auth?.user?.address}</h4>
              <h4>Contact : {auth?.user?.phone}</h4>
            </div>
          </div>
          
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard
