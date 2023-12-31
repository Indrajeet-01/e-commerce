import {createStore, combineReducers, applyMiddleware} from "redux"
import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"
import { productDetailReducer, productReducer } from "./redux/reducers/productReducer"
import { userReducer } from "./redux/reducers/userReducer"
import { cartReducer } from "./redux/reducers/cartReducer"

const reducer  = combineReducers({
    products:productReducer,
    productDetails:productDetailReducer,
    user: userReducer,
    cart: cartReducer, 
})

let initialState = {
    cart: {
      cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
      shippingInfo: localStorage.getItem("shippingInfo")
        ? JSON.parse(localStorage.getItem("shippingInfo"))
        : {},
    },
  };

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware)))

export default store