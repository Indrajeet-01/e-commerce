import Header from './component/layout/header/Header';
import Footer from "./component/layout/footer/Footer"
import './App.css';
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import WebFont from "webfontloader"
import React from "react"
import Home from "./component/home/Home"
import Loader from './component/layout/loader/Loader';
import ProductDetail from './component/product/ProductDetail';



function App() {
  React.useEffect(()=>{
    WebFont.load({
      google:{
        families:["Roboto","Droid Sans","Chilanka"]
      }
    })
  },[])
  return (
    <div className="App">
      <Router>
        <Header/>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
        <Route exact path='/product/:id' element={<ProductDetail/>}/>

        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
