import Header from './component/layout/header/Header';
import Footer from "./component/layout/footer/Footer"
import './App.css';
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import WebFont from "webfontloader"
import React, { useState } from "react"
import Home from "./component/home/Home"
import Loader from './component/layout/loader/Loader';
import ProductDetail from './component/product/ProductDetail';
import Products from './component/product/Products';
import Search from './component/product/Search';
import LoginSignUp from './component/user/LoginSignUp';
import store from './store'
import { loadUser } from './redux/actions/userActions';
import { useSelector } from 'react-redux';
import UserOptions from './component/layout/header/UserOptions';
import Cart from './component/cart/Cart';
import Shipping from './component/cart/Shipping';
import Profile from './component/user/Profile';
import ProtectedRoute from './component/route/ProtectedRoute';
import ConfirmOrder from './component/cart/ConfirmOrder';
import UpdateProfile from './component/user/UpdateProfile';
import ForgotPassword from './component/user/ForgotPassword';
import UpdatePassword from './component/user/UpdatePassword';
import ResetPassword from './component/user/ResetPassword';
import axios from 'axios';
import Payment from './component/cart/Payment';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import OrderSuccess from './component/cart/OrderSuccess';
import MyOrders from './component/orders/MyOrders';
import OrderDetails from './component/orders/OrderDetails';
import Dashboard from './component/admin/Dashboard';


function App() {
  const {isAuthenticated, user} = useSelector((state) => state.user)


  React.useEffect(()=>{
    WebFont.load({
      google:{
        families:["Roboto","Droid Sans","Chilanka"]
      }
    })
    store.dispatch(loadUser)
    
  },[]) 
  return (
    <div className="App">
      <Router>
        <Header/>
        {isAuthenticated && <UserOptions user={user} />}
        
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/product/:id' element={<ProductDetail/>}/>
          <Route exact path='/products' element={<Products/>} />
          <Route path='/products/:keyword' element={<Products/>} />
          <Route exact path='/search' element={<Search/>} />
          
          <Route exact path='/login' element={<LoginSignUp/>} />
          <Route exact path='/account' element={<Profile/>} />
          <Route exact path='/orders' element={<MyOrders/>} />
          <Route exact path='/order/:id' element={<OrderDetails/>} />

          <Route exact path='/me/update' element={<UpdateProfile/>} />
          <Route exact path='/password/forgot' element={<ForgotPassword/>} />
          <Route exact path='/password/update' element={<UpdatePassword/>} />
          <Route exact path='/password/reset/:token' element={<ResetPassword/>} />

          <Route exact path='/cart' element={<Cart/>} />
          <Route exact path='/shipping' element={<Shipping/>} />
          <Route exact path='/order/confirm' element={<ConfirmOrder/>} />
          <Route exact path='/process/payment' element={<Payment/>} />
          <Route exact path='/success' element={<OrderSuccess/>} />

          <Route exact path='/admin/dashboard' element={<Dashboard/>}/>
        </Routes>
        <Footer/> 
      </Router>
    </div>
  );
}

export default App;
