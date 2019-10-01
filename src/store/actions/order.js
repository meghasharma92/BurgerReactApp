import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseOrderSuccess = (orderId, orderData) => {
    return {
        type: actionTypes.PURCHASE_ORDER_SUCCESS,
        id: orderId,
        orderData: orderData
    }
}

export const purchaseOrderFailed = (error) => {
    return {
        type: actionTypes.PURCHASE_ORDER_FAILED,
        error: error
    }
}

export const purchaseOrderStart = () => {
    return {
        type: actionTypes.PURCHASE_ORDER_START,
        loading: true
    }
}

export const purchaseOrder = (orderData) => {
    return dispatch => {
        dispatch(purchaseOrderStart());
        axios.post('/orders.json', orderData)
		.then(response => {
			dispatch(purchaseOrderSuccess(response.data.name, orderData));
		})
		.catch(error => {
            dispatch(purchaseOrderFailed(error));
			}
		);
    }
}



export const fetchOrdersFailed = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAILED,
        error: error,
        loading: false
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrdersSuccess = (res) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: res
    }
}

export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        axios.get('/orders.json').then(res => {
            const fetchedOrders = [];
            for(let key in res.data){
                fetchedOrders.push({
                    ...res.data[key],
                    id: key
                    });
            }
            dispatch(fetchOrdersSuccess(fetchedOrders));
		})
		.catch(error => {
            dispatch(fetchOrdersFailed(error));
		})
    }
}