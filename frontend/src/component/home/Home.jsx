import React, { Fragment ,useEffect} from 'react'
import {CgMouse} from "react-icons/cg"
import "./Home.css"
import ProductCard from './ProductCard'
import MetaData from '../layout/MetaData'
import { getProduct } from '../../redux/actions/productActions'
import { useDispatch, useSelector } from "react-redux"

const Home = () => {
    const dispatch = useDispatch()
    const {loading,error,products,productsCount} = useSelector(
        (state) => state.products
    )

    useEffect(() => {
        dispatch(getProduct())
    },[dispatch])
  return (
    <Fragment>
        <MetaData title={"shop cart"} />
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
            {products && 
                products.map(product => (
                    <ProductCard product={product} />
            ))
            }
            
        </div>
    </Fragment>
  )
}

export default Home