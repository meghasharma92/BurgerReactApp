import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';


class Checkout extends Component {

	// state = {
	// 	ingredients: null,
	// 	totalPrice: null
	// }

	// componentWillMount(){
	// 	const query = new URLSearchParams(this.props.location.search);
	// 	const ingredients = {};
	// 	let price = null;
	// 	for(let param of query) {
	// 		if (param[0] == 'price'){
	// 			price = +param[1]
	// 		}
	// 		else{
	// 			ingredients[param[0]] = +param[1]
	// 		}
	// 	}
	// 	this.setState({'ingredients': ingredients, 'totalPrice': price});
	// }

	cancelHandler = () => {
		this.props.history.goBack();
	}

	continueHandler = () => {
		console.log(this.props.match.path);
		this.props.history.replace('/checkout/contact-data');
	}

	render(){
		let summary = (<Redirect to="/" />); 

		if(this.props.ings){
			summary = (<div>
			<CheckoutSummary 
			 ingredients={this.props.ings}
			 checkoutContinue={this.continueHandler} 
			 checkoutCancel={this.cancelHandler}/>
			<Route 
			path={this.props.match.path + '/contact-data'}
			component={ContactData}>
			</Route>
			</div>)
		}
		return (summary);
	}
}

const mapStatetoProps = state => {
	return {
		ings: state.burgerBuilderReducer.ingredients,
		price: state.burgerBuilderReducer.totalPrice
	}
}

export default connect(mapStatetoProps)(Checkout);