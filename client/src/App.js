import { Routes,Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import ContactPage from "./pages/ContactPage";
import Policy from "./pages/Policy";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/user/Dashboard";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import PrivateRoute from "./components/route/PrivateRoute";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import AdminRoute from "./components/route/AdminRoute";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import User from "./pages/Admin/User";
import Order from "./pages/user/Order";
import Profile from "./pages/user/Profile";
import Products from "./pages/Admin/Products";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import CategoryProduct from "./pages/CategoryProduct";
import CartPage from "./pages/CartPage";
import AdminOrders from "./pages/Admin/AdminOrders";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />}/>
          <Route path="user/orders" element={<Order />}/>
          <Route path="user/profile" element={<Profile />}/>
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />}/>
          <Route path="admin/create-category" element={<CreateCategory />}/>
          <Route path="admin/create-product" element={<CreateProduct />}/>
          <Route path="admin/product/:slug" element={<UpdateProduct/>}/>
          <Route path="admin/user" element={<User />}/>
          <Route path = "admin/orders" element={<AdminOrders />} />
          <Route path="admin/products" element={<Products />}/>
        </Route>
          
        <Route path="/cart" element={<CartPage />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/contact" element={<ContactPage />}/>
        <Route path="/policy" element={<Policy />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/product/:slug" element={<ProductDetails />}/>
        <Route path="/category/:slug" element={<CategoryProduct />}/>
        <Route path="/search" element={<Search />} />
        <Route path="/forgot-password" element={<ForgotPassword />}/>
        <Route path="*" element={<PageNotFound />}/>
      </Routes>     
    </>
  );
}

export default App;
