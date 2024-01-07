import Header from './component/layout/header/Header';
import Footer from "./component/layout/footer/Footer"
import './App.css';
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import WebFont from "webfontloader"
import React from "react"
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
          
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
