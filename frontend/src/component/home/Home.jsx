import React, { Fragment } from 'react'
import {CgMouse} from "react-icons/cg"
import "./Home.css"
import ProductCard from './ProductCard'

const product ={
    name:"Blue Tshirt",
    images:[{url:"https://as1.ftcdn.net/v2/jpg/02/34/30/22/1000_F_234302202_q3N9eIsx8SjajpQBypIug2GA2COz0gBh.jpg"}],
    price:"$56",
    _id:"jk76gd578jg6"
}
const Home = () => {
  return (
    <Fragment>
        <div className="banner">
            <p>Welcome to Shop Cart</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>
            <a href="#container">
                <button>
                    Scroll <CgMouse/>
                </button>
            </a>
        </div>
        <h2 className="homeHeading">Featured Products</h2>
        <div className="container" id='container'>
            <ProductCard product={product}/>
            <ProductCard product={product}/>
            <ProductCard product={product}/>
            <ProductCard product={product}/>
            <ProductCard product={product}/>
            <ProductCard product={product}/>
        </div>
    </Fragment>
  )
}

export default Home