import React,{ Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as orderActions from '../../store/actions/index';

class Orders extends Component{

	// state = {
	// 	orders: [],
	// 	loading: true
	// }

	componentDidMount(){
		this.props.onInitOrders();
	}

	render(){

		let order = <Spinner />

		if (!this.props.loading){
			order = (<div>
				{this.props.orders.map(order=>(
					<Order key={order.id}
					price={order.price}
					ingredients={order.ingredients}
					/>
					))}
			</div>)
		}
		return(order);
	}
	
}

const mapStatetoProps = state => {
	return {
		orders: state.orderReducer.orders,
		loading: state.orderReducer.loading,
		error: state.orderReducer.error
	}
}

const mapDispatchtoProps = dispatch => {
	return{
		onInitOrders: () => dispatch(orderActions.fetchOrders())
	}
}

export default connect(mapStatetoProps, mapDispatchtoProps)(withErrorHandler(Orders, axios));