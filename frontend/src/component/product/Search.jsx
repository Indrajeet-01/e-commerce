import { useSelector } from "react-redux"
import "./search.css"
import React, { Fragment, useState } from 'react'
import Products from "./Products"

const Search = () => {
    const {products} = useSelector(state => state.products)
    const [searchTerm , setSearchTerm] = useState("")
    
  return (
    <Fragment>
        <form className="searchBox" >
            <input 
                type="text" 
                placeholder="search a product"
                onChange={(e) => {setSearchTerm(e.target.value)}}
            />
            <input type="submit" value="search"/>
        </form>
        
    </Fragment>
  )
}

export default Search