
import "./search.css"
import React, { Fragment, useState } from 'react'
import { useNavigate } from "react-router-dom"


const Search = () => {
    
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate()

    const searchSubmitHandler = (e) => {
      e.preventDefault();
      if (keyword.trim()) {
        navigate(`/products/${keyword}`);
      } else {
        navigate("/products");
      }
    };
    
  return (
    <Fragment>
        <form className="searchBox" onSubmit={searchSubmitHandler} >
            <input 
                type="text" 
                placeholder="search a product"
                onChange={(e) => setKeyword(e.target.value)}
            />
            <input type="submit" value="search"/>
        </form>
        
    </Fragment>
  )
}

export default Search