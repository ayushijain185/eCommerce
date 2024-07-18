import React from 'react'
import { Link } from 'react-router-dom'
const UserMenu = () => {
  return (
    <>
        <div className="text-center">
        <div className="list-group">
            <h5>User Dashboard</h5>
            <Link to="/dashboard/user" className="list-group-item list-group-item-action " >User</Link>
            <Link to="/dashboard/user/profile" className="list-group-item list-group-item-action " >Update Profile</Link>
            <Link to="/dashboard/user/orders" className="list-group-item list-group-item-action " >Orders</Link>
            </div>
        </div>
    </>
  )
}
export default UserMenu;