import React, { Fragment, useEffect, useState } from 'react'
import "./products.css"
import { useSelector,useDispatch } from 'react-redux'
import { clearErrors, getProduct } from '../../redux/actions/productActions'
import Loader from '../layout/loader/Loader'
import ProductCard from '../home/ProductCard'
// import Pagination from "react-js-pagination"
import { useParams } from 'react-router-dom'
import { useAlert } from 'react-alert'
import {Pagination} from "@mui/material"
import {Slider, Typography} from '@mui/material'

const categories = [
    "footwear",
    "inner wear",
    "mens wear",
    "Shirts",
    "Jeans",
    "Denims"
]


const Products = () => {
    const dispatch = useDispatch()
    
    const {id} = useParams()
    const [currentPage,setCurrentPage] = useState(1)
    const [price, setPrice] = useState([0, 25000])
    const [category, setCategory] = useState("")
    const [ratings, setRatings] = useState(0)
    const {products, loading, error, productsCount,resultPerPage, filteredProductsCount,} = useSelector((state) => state.products)

    let count = filteredProductsCount;
    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
      };

    const priceHandler = (event,  newPrice) => {
        setPrice(newPrice)
    }

    useEffect(() => {
        if (error) {
            
            dispatch(clearErrors());
          }
        dispatch(getProduct(id,currentPage,price,category,ratings))
    }, [dispatch,id,currentPage,price,category,ratings])

 



  return (
    <Fragment>
        {loading ? (<Loader/>) :
        (<Fragment>
            <h2 className="productsHeading">Products</h2>

            <div className="products">
                {products && 
                    products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))
                }
            </div>

            <div className="filterBox">
                <Typography>Price</Typography>
                <Slider
                    value={price}
                    onChange={priceHandler}
                    valueLabelDisplay='auto'
                    aria-labelledby='range-slider'
                    min={0}
                    max={25000}
                />

                <Typography>Categories</Typography>
                <ul className="categoryBox">
                    {categories.map((category) => (
                        <li className="category-link"
                            key={category}
                            onClick={() => setCategory(category)}
                        >
                            {category}
                        </li>
                    ))}
                </ul>

                <fieldset>
                    <Typography component="legend">Ratings Above</Typography>
                    <Slider
                        value={ratings}
                        onChange={(newRating) => {
                            setRatings(newRating)
                        }}
                        
                        aria-labelledby='continuous-slider'
                        min={0}
                        max={5}
                        valueLabelDisplay='auto'
                    />
                </fieldset>
            </div>
            
            
            <div className="paginationBox">
                <Pagination

                    count={5}
                    page={currentPage}
                    onChange={setCurrentPageNo}
                />
            </div>

            
        </Fragment>
        )}
    </Fragment>
  )
}

export default Products