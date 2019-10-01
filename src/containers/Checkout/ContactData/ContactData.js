import React, { Component } from 'react';
import classes from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import axios from '../../../axios-orders';
import { connect } from 'react-redux';

import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

class ContactData extends Component {

	state = {
		orderForm: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your name'
				},
				value: '',
				validation: {
					required: true
				},
				valid: true,
				touched: false
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your street'
				},
				value: '',
				validation: {
				 required: true
				},
				valid: true,
				touched: false
			},
			zipCode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your zipCode'
				},
				value: '',
				validation: {
				 required: true,
				 minLength: 5,
				 maxLength: 5
				},
				valid: true,
				touched: false
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your country'
				},
				value: '',
				validation: {
				 required: true
				},
				valid: true,
				touched: false
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Your email'
				},
				value: '',
				validation: {
				 required: true
				},
				valid: true,
				touched: false
			},		
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [{value: 'fastest', displayName: 'Fastest'},
					{value: 'cheapest', displayName: 'Cheapest'}]
				},
				value: '',
				validation: {
				 required: false
				},
				valid: true
			}
		},
		formIsValid: false,
		loading: false
	}

	checkValidation(value, rules){

		let isValid = true;

		if (rules.required && rules.touched ){
			isValid = value.trim() !== '' && isValid;
		}

		if (rules.minLength){
			isValid = value.length >= rules.minLength && isValid
		}

		if (rules.maxLength){
			isValid = value.length <= rules.maxLength && isValid
		}

		return isValid;
	}

	orderHandler = (event) => {
		event.preventDefault();
		console.log(this.props.ings);

		const formData = {};

		for(let formIdentifier in this.state.orderForm){
			formData[formIdentifier] = this.state.orderForm[formIdentifier].value;
		}

		const order = { 
			ingredients: this.props.ings,
			price: this.props.price,
			orderData: formData
		}

		this.props.onPurchaseOrder(order);
	}

	changeHandler = (event, inputIdentifier) => {
			console.log(event.target.value);
			const updatedForm = {...this.state.orderForm};
			const updatedFormElement = {
				...updatedForm[inputIdentifier]
			};
			updatedFormElement.value = event.target.value;
			updatedFormElement.touched = true;
			updatedFormElement.valid = this.checkValidation(updatedFormElement.value, updatedFormElement.validation);
			updatedForm[inputIdentifier] = updatedFormElement;
			console.log(updatedFormElement);
			let formIsValid = true;
			for(let inputIdentifier in updatedForm){
				formIsValid = updatedForm[inputIdentifier].valid && formIsValid 
			}
			this.setState({orderForm: updatedForm, formIsValid: formIsValid});
	}


	render(){
		const formElements = [];

		for(let key in this.state.orderForm){
				formElements.push({
					id: key,
					config: this.state.orderForm[key]
				})			
		}

		let form =(<form onSubmit={this.orderHandler}> 
				{formElements.map(formElement => (
					<Input 
					key = {formElement.id}
					elementType = {formElement.config.elementType}
					elementConfig = {formElement.config.elementConfig} 
					value = {formElement.config.value}
					invalid = {!formElement.config.valid}
					shouldValidate = {formElement.config.validation}
					touched = {formElement.config.touched}
					changed = {(event) => this.changeHandler(event, formElement.id)} />	
				))}
				<Button btnType="Success" disabled={!this.state.formIsValid}> ORDER </Button>
				</form>);

		if(this.props.loading){
			form = <Spinner/>
		}

		return(
			<div className={classes.ContactData}>
				<h4>Enter your data:</h4>
				{form}
			</div>
		);
	}

}

const mapStatetoProps = state => {
	return {
		ings: state.burgerBuilderReducer.ingredients,
		price: state.burgerBuilderReducer.totalPrice,
		loading: state.orderReducer.loading
	}
}

const mapDispatchtoProps = dispatch => {
	return{
		onPurchaseOrder: (orderData) => dispatch(actions.purchaseOrder(orderData))
	}
}

export default connect(mapStatetoProps, mapDispatchtoProps)(withErrorHandler(ContactData, axios));