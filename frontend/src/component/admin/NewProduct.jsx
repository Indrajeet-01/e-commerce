import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearErrors, createProduct } from '../../redux/actions/productActions'
import { NEW_PRODUCT_RESET } from '../../redux/constants/productConstant'
import MetaData from '../layout/MetaData'
import SideBar from './SideBar'
import { Button } from "@material-ui/core";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import './newProduct.css'

const NewProduct = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {loading, error, success} = useSelector((state) => state.newProduct)

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [stock, setStock] = useState(0)
    const [images, setImages] = useState([])
    const [imagesPreview, setImagesPreview] = useState([])

    const categories = [
        "footwear",
        "inner wear",
        "mens wear",
        "Shirts",
        "Jeans",
        "Denims"
    ]

    useEffect(() => {
        if(error) {
            alert(error)
            dispatch(clearErrors)
        }
        if (success) {
            alert('product created successfully')
            navigate('/admin/dashboard')
            dispatch({type: NEW_PRODUCT_RESET})
        }
    },[dispatch, navigate])

    const createProductSubmitHAndler = (e) => {
        e.preventDefault()
        const myForm = new FormData()

        myForm.set('name', name)
        myForm.set('price', price)
        myForm.set('description', description)
        myForm.set('category', category)
        myForm.set('stock', stock)

        images.forEach((image) => {
            myForm.append("images", image)
        })
        console.log(images)
        dispatch(createProduct(myForm))
    }

    const createProductImagesChange = (e) => {
        const files = Array.from(e.target.files);
    
        setImages([]);
        setImagesPreview([]);
    
        files.forEach((file) => {
          const reader = new FileReader();
    
          reader.onload = () => {
            if (reader.readyState === 2) {
              setImagesPreview((old) => [...old, reader.result]);
              setImages((old) => [...old, reader.result]);
            }
          };
    
          reader.readAsDataURL(file);
        });
      };

    return (
        <Fragment>
            <MetaData title='Create Product - Admin' />
            <div className="dashboard">
                <SideBar/>
                <div className="newProductContainer">
                    <form 
                        className="createProductForm"
                        encType="multipart/form-data"
                        onSubmit={createProductSubmitHAndler}
                    >
                        <h1>Create Product</h1>
                        <div>
                            <SpellcheckIcon/>
                            <input 
                                type="text" 
                                placeholder='product name'
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <AttachMoneyIcon />
                            <input 
                                type="number"
                                placeholder='price'
                                required
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                        <div>
                            <DescriptionIcon />
                            <textarea
                                cols='30'
                                rows='1'
                                placeholder='product description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>
                        <div>
                            <AccountTreeIcon />
                            <select onChange={(e) => setCategory(e.target.value)}>
                                <option value="">Choose Category</option>
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <StorageIcon />
                            <input 
                                type="text"
                                placeholder='stock'
                                value={stock}
                                required
                                onChange={(e) => setStock(e.target.value)}
                            />
                        </div>
                        <div id="createProductFormFile">
                            <input 
                                type="file"
                                name='avatar'
                                accept='image/*'
                                onChange={createProductImagesChange}
                                multiple
                            />
                        </div>
                        <div id="createProductFormImage">
                            {imagesPreview.map((image,index) => (
                                <img key={index} src={image} alt='product preview'/>
                            ))}
                        </div>
                        <Button
                            type='submit'
                            id="createProductBtn"
                            disabled={loading ? true : false}
                        >
                            Create
                        </Button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default NewProduct