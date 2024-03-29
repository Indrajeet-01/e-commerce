import React, { useEffect, Fragment } from 'react'
import { DataGrid} from '@material-ui/data-grid'
import { Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, deleteProduct, getAdminProduct } from '../../redux/actions/productActions'
import { DELETE_PRODUCT_RESET } from '../../redux/constants/productConstant'
import { useNavigate } from 'react-router-dom'
import MetaData from '../layout/MetaData';
import SideBar from './SideBar';
import './productList.css'

const ProductList = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { error,products} = useSelector((state) => state.products)
    const {error: deleteError, isDeleted} = useSelector((state) => state.productAdmin)
    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id))
    }
    useEffect(() => {
        if(error) {
            alert(error)
            dispatch(clearErrors())
        }
        if (deleteError) {
            alert(deleteError);
            dispatch(clearErrors());
        }
        if (isDeleted) {
            alert('product deleted successfully')
            navigate('/admin/dashboard')
            dispatch({type: DELETE_PRODUCT_RESET})
        }
        dispatch(getAdminProduct())
    },[dispatch, navigate,])

    const columns = [
        { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
    
        {
          field: "name",
          headerName: "Name",
          minWidth: 350,
          flex: 1,
        },
        {
          field: "stock",
          headerName: "Stock",
          type: "number",
          minWidth: 150,
          flex: 0.3,
        },
    
        {
          field: "price",
          headerName: "Price",
          type: "number",
          minWidth: 270,
          flex: 0.5,
        },
    
        {
          field: "actions",
          flex: 0.3,
          headerName: "Actions",
          minWidth: 150,
          type: "number",
          sortable: false,
          renderCell: (params) => {
            return (
              <Fragment>
                <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
                  <EditIcon />
                </Link>
    
                <Button
                  onClick={() =>
                    deleteProductHandler(params.getValue(params.id, "id"))
                  }
                >
                  <DeleteIcon />
                </Button>
              </Fragment>
            );
          },
        },
      ];

    const rows = []

    products && products.forEach((item) => {
        rows.push({
            id : item._id,
            stock : item.stock,
            price : item.price,
            name : item.name,
        })
    })

    return (
        <Fragment>
            <MetaData title={`ALL PRODUCTS - Admin`} />
            <div className='dashboard'>
                <SideBar />
                <div className='productListContainer'>
                    <h1 id="productListHeading">All Products</h1>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        className='productListTable'
                        autoHeight
                    />
                </div>
            </div>
        </Fragment>
    )
}

export default ProductList