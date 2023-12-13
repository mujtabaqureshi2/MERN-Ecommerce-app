import { CREATE_ORDER_FAILURE,
     CREATE_ORDER_REQUEST,
      CREATE_ORDER_SUCCESS,
    ORDER_DETAILS_FAILURE,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_REQUEST,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAILURE,
    ORDER_PAY_RESET,
    LIST_MY_ORDER_REQUEST,
    LIST_MY_ORDER_SUCCESS,
    LIST_MY_ORDER_FAILURE,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAILURE,
    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_SUCCESS,
    ORDER_DELIVER_FAILURE,
    ORDER_DELIVER_RESET} from "../constants/orderConstant"

export const orderCreateReducer = (state ={}, action) => {

    switch(action.type){
        case CREATE_ORDER_REQUEST:
             return {loading: true}

       case CREATE_ORDER_SUCCESS: 

       return {
        loading:false,
        success:true,
        order:action.payload
       }

       case CREATE_ORDER_FAILURE:
        return {
            loading: false,
            error:action.payload,
        }
       default: 
       return state

}
}

export const orderDetailsReducer  = (state = {loading:true, orderItems: [], shippingAddress: {}}, action) => {
    switch(action.type){
        case ORDER_DETAILS_REQUEST:
            return {...state, loading: true}
            
        case ORDER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                order: action.payload,
                
                }
            

        case ORDER_DETAILS_FAILURE: 
        return {
             loading: false,
             error: action.payload
        }
        default: 
       return state

}
}

export const orderPaidReducer  = (state = {}, action) => {
    switch(action.type){
        case ORDER_PAY_REQUEST:
            return {
                
                 loading: true}
            
        case ORDER_PAY_SUCCESS:
            return {
                
                loading: false,
                success: true,
                }
            

        case ORDER_PAY_FAILURE: 
        return {
             loading: false,
             error: action.payload
        }

        case ORDER_PAY_RESET: 
        return {}
        default: 
       return state

}
}

export const orderDeliverReducer  = (state = {}, action) => {
    switch(action.type){
        case ORDER_DELIVER_REQUEST:
            return {
                
                 loading: true}
            
        case ORDER_DELIVER_SUCCESS:
            return {
                
                loading: false,
                success: true,
                }
            

        case ORDER_DELIVER_FAILURE: 
        return {
             loading: false,
             error: action.payload
        }

        case ORDER_DELIVER_RESET: 
        return {}
        default: 
       return state

}
}

export const listMyOrderReducer  = (state = {orders: []}, action) => {
    switch(action.type){
        case LIST_MY_ORDER_REQUEST:
            return {
                 loading: true}
            
        case LIST_MY_ORDER_SUCCESS:
            return {
                
                loading: false,
                orders: action.payload,
                }
            

        case LIST_MY_ORDER_FAILURE: 
        return {
             loading: false,
             error: action.payload
        }

        default: 
       return state
}
}

export const orderListReducer  = (state = {loading:true, orderItems: []}, action) => {
    switch(action.type){
        case ORDER_LIST_REQUEST:
            return { loading: true}
            
        case ORDER_LIST_SUCCESS:
            return {
                
                loading: false,
                orders: action.payload,
                
                }
            

        case ORDER_LIST_FAILURE: 
        return {
             loading: false,
             error: action.payload
        }
        default: 
       return state

}
}