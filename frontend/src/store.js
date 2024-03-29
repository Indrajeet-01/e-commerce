import {createStore, combineReducers, applyMiddleware} from "redux"
import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"
import { productDetailReducer, productReducer, newReviewReducer,newProductReducer,productReviewsReducer, productAdminReducer, reviewReducer } from "./redux/reducers/productReducer"
import { userReducer, forgotPasswordReducer, profileReducer, userDetailsReducer, allUsersReducer  } from "./redux/reducers/userReducer"
import { cartReducer } from "./redux/reducers/cartReducer"
import { newOrderReducer, myOrdersReducer, orderDetailsReducer, orderReducer, allOrdersReducer } from "./redux/reducers/orderReducer"

const reducer  = combineReducers({
    products:productReducer,
    productDetails:productDetailReducer,
    newReview: newReviewReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    profile: profileReducer,
    cart: cartReducer, 
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetail: orderDetailsReducer,
    allOrders: allOrdersReducer,
    order: orderReducer,
    allUsers:allUsersReducer,
    userDetails: userDetailsReducer,
    newProduct: newProductReducer,
    productAdmin: productAdminReducer,
    productsReview: productReviewsReducer,
    review: reviewReducer,
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