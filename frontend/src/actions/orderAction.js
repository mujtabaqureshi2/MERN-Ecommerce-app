import { CREATE_ORDER_FAILURE,
     CREATE_ORDER_REQUEST,
      CREATE_ORDER_SUCCESS,
       LIST_MY_ORDER_FAILURE,
       LIST_MY_ORDER_REQUEST,
       LIST_MY_ORDER_SUCCESS,
       ORDER_DELIVER_FAILURE,
       ORDER_DELIVER_REQUEST,
       ORDER_DELIVER_SUCCESS,
       ORDER_DETAILS_FAILURE,
        ORDER_DETAILS_REQUEST,
         ORDER_DETAILS_SUCCESS,
         ORDER_LIST_FAILURE,
         ORDER_LIST_REQUEST,
         ORDER_LIST_SUCCESS,
         ORDER_PAY_FAILURE,
         ORDER_PAY_REQUEST,
         ORDER_PAY_SUCCESS,
           } from "../constants/orderConstant"
import axios from 'axios'

export const createOrder = (order) => async (dispatch,getState) => {

    try {
       dispatch({
        type: CREATE_ORDER_REQUEST
       }) 
          const {userLogin:{userInfo}} = getState()

       const config = {
        headers: {
            'Content-Type' : 'application/json',
            Authorization: `Bearer ${userInfo.token}`
        }
       }

       const {data} = await axios.post('/api/orders',order, config)

   dispatch({
    type:CREATE_ORDER_SUCCESS,
    payload: data
   })
   

   
    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAILURE,
            payload: error.response && error.response.data.message 
            ?error.response.data.message 
            : error.message
        })
    }
}

export const getOrderDetails = (id) => async (dispatch,getState) => {

    try {
       dispatch({
        type: ORDER_DETAILS_REQUEST
       }) 
          const {userLogin:{userInfo}} = getState()

       const config = {
        headers: {
            
            Authorization: `Bearer ${userInfo.token}`
        }
       }

       const {data} = await axios.get(`/api/orders/${id}`,config)

   dispatch({ 
    type:ORDER_DETAILS_SUCCESS,
    payload: data
   })
   

   
    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAILURE,
            payload: error.response && error.response.data.message 
            ?error.response.data.message 
            : error.message
        })
    }
}

export const orderPay = (id,paymentResult) => async (dispatch,getState) => {

    try {
       dispatch({
        type: ORDER_PAY_REQUEST
       }) 
          const {userLogin:{userInfo}} = getState()

       const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`
        }
       }

       const {data} = await axios.put(`/api/orders/${id}/pay`,paymentResult, config)

   dispatch({
    type:ORDER_PAY_SUCCESS,
    payload: data
   })
   

   
    } catch (error) {
        dispatch({
            type: ORDER_PAY_FAILURE,
            payload: error.response && error.response.data.message 
            ?error.response.data.message 
            : error.message
        })
    }
}

export const orderDeliver = (id) => async (dispatch,getState) => {

    try {
       dispatch({
        type: ORDER_DELIVER_REQUEST
       }) 
          const {userLogin:{userInfo}} = getState()

       const config = {
        headers: {
            
            Authorization: `Bearer ${userInfo.token}`
        }
       }

       const {data} = await axios.put(`/api/orders/${id}/deliver`,{}, config)

   dispatch({
    type:ORDER_DELIVER_SUCCESS,
    payload: data
   })
   

   
    } catch (error) {
        dispatch({
            type: ORDER_DELIVER_FAILURE,
            payload: error.response && error.response.data.message 
            ?error.response.data.message 
            : error.message
        })
    }
}

export const listMyOrder = () => async (dispatch,getState) => {

    try {
       dispatch({
        type: LIST_MY_ORDER_REQUEST
       }) 
          const {userLogin:{userInfo}} = getState()

       const config = {
        headers: { Authorization: `Bearer ${userInfo.token}` }
       }

       const {data} = await axios.get(`/api/orders/myorders`,config)

   dispatch({
    type:LIST_MY_ORDER_SUCCESS,
    payload: data
   })

   
   

   
    } catch (error) {
        dispatch({
            type: LIST_MY_ORDER_FAILURE,
            payload: error.response && error.response.data.message 
            ?error.response.data.message 
            : error.message
        })
    }
}


export const listOrders = () => async (dispatch,getState) => {

    try {
       dispatch({
        type: ORDER_LIST_REQUEST
       }) 
          const {userLogin:{userInfo}} = getState()

       const config = {
        headers: { Authorization: `Bearer ${userInfo.token}` }
       }

       const {data} = await axios.get(`/api/orders`,config)

   dispatch({
    type:ORDER_LIST_SUCCESS,
    payload: data
   })
   

   
    } catch (error) {
        dispatch({
            type: ORDER_LIST_FAILURE,
            payload: error.response && error.response.data.message 
            ?error.response.data.message 
            : error.message
        })
    }
}