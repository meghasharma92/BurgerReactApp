import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    orders: [],
    loading: true
};


const reducer = (state = initialState, action) => {
    switch(action.type) {

       case  actionTypes.PURCHASE_ORDER_FAILED: 
            return updateObject(state, { loading:false });

       case actionTypes.PURCHASE_ORDER_SUCCESS:
           const newOrder = {
               ...action.orderData,
               id: action.id
           }
        return updateObject(state, { loading:false, orders: state.orders.concat(newOrder) });

        case  actionTypes.FETCH_ORDERS_SUCCESS: 
           return updateObject(state, { loading:false, orders: action.orders });

        case  actionTypes.FETCH_ORDERS_START: 
           return updateObject(state, { loading:true });

        case  actionTypes.FETCH_ORDERS_FAILED: 
            return updateObject(state, { loading:false });
            
        default: 
           return state;
        
        }
}

export default reducer;