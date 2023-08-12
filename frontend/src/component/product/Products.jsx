import React, { Fragment, useEffect, useState } from 'react'
import "./products.css"
import { useSelector,useDispatch } from 'react-redux'
import { clearErrors, getProduct } from '../../redux/actions/productActions'
import Loader from '../layout/loader/Loader'
import ProductCard from '../home/ProductCard'
import Pagination from "react-js-pagination"
import { useParams } from 'react-router-dom'

const Products = () => {
    const dispatch = useDispatch()
    const {id} = useParams()
    const [currentPage,setCurrentPage] = useState(1)
    const {products, loading, error, productsCount,resultPerPage} = useSelector(state => state.products)

   
    const setCurrentPageNo = (e)=>{
        setCurrentPage(e)
    }

    useEffect(() => {
        dispatch(getProduct(id,currentPage))
    }, [dispatch,id,currentPage])



  return (
    <Fragment>
        {loading ? <Loader/> :
        <Fragment>
            <h2 className="productsHeading">Products</h2>

            <div className="products">
                {products && 
                    products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))
                }
            </div>

            
                <div className="paginationBox">
                <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={resultPerPage}
                    totalItemsCount={productsCount}
                    onChange={setCurrentPageNo}
                    nextPageText="Next"
                    prevPageText="Prev"
                    firstPageText="1st"
                    lastPageText="last"
                    itemClass="page-item"
                    linkClass="page-link"
                    
                    activeClass="pageItemActive"
                    activeLinkClass="pageLinkActive"
                />
            </div>
     
        </Fragment>}
    </Fragment>
  )
}

export default Products