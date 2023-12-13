import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { productListReducer, productDetailsReducer, productDeleteReducer, productCreateReducer, productUpdateReducer, productCreateReviewReducer, productTopRatedReducer } from '../reducers/product_reducers';
import { cartReducer } from '../reducers/cartReducers';
import { listMyOrderReducer, orderCreateReducer ,orderDeliverReducer,orderDetailsReducer,orderListReducer,orderPaidReducer} from '../reducers/orderReducer';
import { userLoginReducer ,userRegisterReducer ,userDetailsrReducer,userUpdateProfilerReducer, userListReducer, userDeleteReducer, userUpdateReducer} from '../reducers/userReducers';
import { composeWithDevTools } from 'redux-devtools-extension';


const reducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productCreateReview: productCreateReviewReducer,
  topRatedProducts: productTopRatedReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsrReducer,
  userUpdateProfile: userUpdateProfilerReducer,
  createOrder: orderCreateReducer ,
  orderDetails: orderDetailsReducer,
  orderPay: orderPaidReducer,
  orderDeliver: orderDeliverReducer,
  listMyOrder: listMyOrderReducer,
  orderList: orderListReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer
}); 


 
 
const middleware = [thunk];

const cartItemsFromStorageRaw = localStorage.getItem('cartItems');
const cartItemsFromStorage = cartItemsFromStorageRaw ? JSON.parse(cartItemsFromStorageRaw) : [];




  const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

  const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {};


const initialState = {
  cart: {
    cartItems: cartItemsFromStorage, 
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: {userInfo:userInfoFromStorage} 
}

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
