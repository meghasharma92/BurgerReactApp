import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as burgerBuilderActions from '../../store/actions/index';

class BurgerBuilder extends Component {

	state = {
		// ingredients: null,
		// totalPrice: 11,
		// purchaseable: false,
		purchasing: false,
		// loading: false,
		// ingredients: null,
		// error: false
	}

	componentDidMount(){
		// axios.get('/ingredients.json')
		// .then(response => {
		// 	console.log(response);
		// 	this.setState({'ingredients': response.data})
		// })
		// .catch(error => console.log(error)
		// );
		console.log(this.props);
		this.props.onInitIngredients();
	}

	updatePurchaseState(ingredients) {
		const sum = Object.keys(ingredients).map(igKey => {
				return ingredients[igKey]
		})
		.reduce((sum,el)=> {
			return sum + el;
		} ,0);
		return sum > 0 ;
	}
	
	// addIngredientHandler = (type) => {
	// 	const oldIngredientCount = this.state.ingredients[type];
	// 	const updatedIngredientCount = oldIngredientCount + 1;
	// 	const updatedIngredients = {
	// 		...this.state.ingredients
	// 	}
	// 	updatedIngredients[type] = updatedIngredientCount;
	// 	const priceAddition = INGREDIENT_PRICES[type];
	// 	const oldPrice = this.state.totalPrice;
	// 	const newPrice = oldPrice + priceAddition;
	// 	this.setState({
	// 		ingredients: updatedIngredients,
	// 		totalPrice: newPrice
	// 	})
	// 	this.updatePurchaseState(updatedIngredients);
	// }
	// removeIngredientHandler = (type) => {
	// 	const oldIngredientCount = this.state.ingredients[type];
	// 	if (oldIngredientCount <= 0 ){ return; }
	// 	const updatedIngredientCount = oldIngredientCount - 1;
	// 	const updatedIngredients = {
	// 		...this.state.ingredients
	// 	}
	// 	updatedIngredients[type] = updatedIngredientCount;
	// 	const priceDeduction = INGREDIENT_PRICES[type];
	// 	const oldPrice = this.state.totalPrice;
	// 	const newPrice = oldPrice - priceDeduction;
	// 	this.setState({
	// 		ingredients: updatedIngredients,
	// 		totalPrice: newPrice
	// 	})
	// 	this.updatePurchaseState(updatedIngredients);
	// }

	purchaseHandler = () => {
		// alert('coming')
		this.setState({purchasing: true})
	}

	cancelPurchaseHandler = () => {
		this.setState({purchasing: false})	
	}

	// purchaseContinueHandler =() => {
	// 	console.log('purchase continue');
	// 	console.log(this.props);
	// 	const queryParams = [];
	// 	for (let i in this.state.ingredients){
	// 		queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
	// 	}

	// 	queryParams.push('price=' + this.state.totalPrice)

	// 	const queryString = queryParams.join('&');

	// 	this.props.history.push({
	// 		pathname: '/checkout',
	// 		search: '?' + queryString
	// 	});
		
	// }

	purchaseContinueHandler = () => {
		this.props.history.push({pathname: '/checkout'});
	}

	render(){

		const disabledInfo = {
			...this.props.ings
		}

		for(let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0
		}

		let orderSummary = <p>ingredients not loaded.</p>

		let burger = <Spinner/>;
			
		if(this.props.ings) {
			burger = (
				<Aux>
				<Burger ingredients={this.props.ings} />
				<BuildControls 
				  addIngredient={this.props.onAddIngredient} 
				  removeIngredient={this.props.onRemoveIngredient} disabledInfo={disabledInfo}
				  price={this.props.price} 
				  purchaseable={this.updatePurchaseState(this.props.ings)}
				  purchasing={this.purchaseHandler}/>
				</Aux>)
			orderSummary = <OrderSummary 
					ingredients={this.props.ings} 
					cancel={this.cancelPurchaseHandler}
					continue={this.purchaseContinueHandler}
					price={this.props.price}
					/>
		}

		if (this.state.loading) {
			orderSummary = <Spinner/>
		}

		return(
			<Aux>
				<Modal show={this.state.purchasing} modalClosed={this.cancelPurchaseHandler}>
					{orderSummary}
				</Modal>
				{burger}

			</Aux>
		);
	}

}

const mapStatetoProps = state => {
		return {
			ings: state.burgerBuilderReducer.ingredients,
			price: state.burgerBuilderReducer.totalPrice,
			error: state.burgerBuilderReducer.error
		}
}

const mapDispatchtoProps = dispatch => {
	return{
		onAddIngredient: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
		onRemoveIngredient: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
		onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients())
	}
}
	
export default connect(mapStatetoProps,mapDispatchtoProps)(withErrorHandler(BurgerBuilder, axios));