import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
		{label: 'Meat', type: 'meat'},
		{label: 'Cheese', type: 'cheese'},
		{label: 'Bacon', type: 'bacon'},
		{label: 'Salad', type: 'salad'},
]
		

const buildControls = (props) => {
	return(
			<div className={classes.BuildControls} >
				<p>Current Price: {props.price}</p>
				{controls.map( ctrl => (
					<BuildControl key={ctrl.label} label={ctrl.label} added={()=> props.addIngredient(ctrl.type)} removed={() => props.removeIngredient(ctrl.type)} disabled={props.disabledInfo[ctrl.type]}/>	
				))}
				<button 
				disabled= {!props.purchaseable}
				onClick = {props.purchasing}
				className={classes.OrderButton}>ORDER NOW</button>
			</div>)
}

export default buildControls;