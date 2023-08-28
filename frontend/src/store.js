import {createStore, combineReducers, applyMiddleware} from "redux"
import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"
import { productDetailReducer, productReducer } from "./redux/reducers/productReducer"
import { userReducer } from "./redux/reducers/userReducer"

const reducer  = combineReducers({
    products:productReducer,
    productDetails:productDetailReducer,
    user: userReducer,
})

let initialState = {}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware)))

export default store