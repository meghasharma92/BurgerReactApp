import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Button from '../UI/Button/Button';


class OrderSummary extends Component { 

		render(){
			const ingredientsSummary = Object.keys(this.props.ingredients)
			.map(igKey => {
			return <li key={igKey} >
			<span style={{textTranform: 'capitalize'}}>{igKey}:</span> 
			{this.props.ingredients[igKey]}</li>
			})

			return(
				<Aux>
					<h3>Your order</h3>
					<p>A delicious burger with the following ingredients: </p>
					<ul>
						{ingredientsSummary}
					</ul>
					<p><strong>Total Price:</strong>{this.props.price.toFixed(2)}</p>
					<p>Continue to Checkout</p>
					<Button clicked={this.props.cancel} btnType="Danger">CANCEL</Button>
					<Button clicked={this.props.continue} btnType="Success"> CONTINUE </Button>
				</Aux>
				)
		}
}

export default OrderSummary;
