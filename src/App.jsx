import React, { useEffect, useState } from "react";
import {  Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Order from "./pages/order/Order";
import Cart from "./pages/cart/Cart";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import Notfound from "./pages/nopage/Notfound";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ProductInfo from "./pages/productInfo/ProductInfo";
import Addproduct from "./pages/Addproduct";
import Updateproduct from "./pages/Updateproduct";
import { auth } from "./firebase/config";
import Mystate from "./context/data/myState";
const App = () => {
  const [user, setuser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    auth.onAuthStateChanged((authuser) => {
      if (authuser) {
        setuser(authuser);
      } else {
        setuser(null);
      }
    });
  }, []);
  return (
    <Mystate >
      <div>
        <Navbar user={user} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/order" element={<Order />} />
          <Route path="/cart" element={<Cart user={user}/>} />
          <Route path="/dashboard" element={<Dashboard  user={user}/>} />
          <Route path="/*" element={<Notfound />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/addproduct"  element={<Addproduct user={user} />} />
          <Route path="/updateproduct" element={<Updateproduct  user={user}/>} />
          <Route path="/productinfo/:id" element={<ProductInfo  user={user}/>} />
        </Routes>
        <Footer />
      </div>
    </Mystate>
  );
};

export default App;

//admin

const ProtectedRouteForAdmin = ({ children }) => {
  const admin = JSON.parse(localStorage.getItem("user"));

  if (admin && admin.user.email === "utkbktss5@gmail.com") {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};