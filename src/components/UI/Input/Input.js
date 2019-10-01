import React from 'react';
import classes from './Input.module.css';

const input = (props) => {

	let inputElement = null;
	let validationError = null;
	const inputClasses = [classes.InputElement];

	console.log(props.shouldValidate);

		if(props.invalid && props.shouldValidate && props.touched){
			console.log('COming in invalid');
			inputClasses.push(classes.Invalid);
		}

	switch(props.elementType){

		case('input'):
			inputElement = <input 
			className={inputClasses.join(' ')} 
			{...props.elementConfig} 
			value={props.value} onChange={props.changed}/>
			break;
		case('textarea'):
			inputElement = <textarea 
			{...props.elementConfig}
			value={props.value} onChange={props.changed}/>
			break;
		case('select'):
			inputElement = (<select 
				className={inputClasses.join(' ')}
				value={props.value}
				onChange={props.changed}
				>
				{props.elementConfig.options.map(option => (
					<option key={option.value} value={option.value}>{option.displayName}</option>)
				)}
				</select>)
			break;

		default:
		    inputElement = <input 
		    className={inputClasses.join(' ')}
		    {...props.elementConfig}
		    value={props.value} onChange={props.changed}/>
	}

	if(props.invalid && props.touched){
		validationError = <p className={classes.ValidationError}>Please enter valid value </p>
	}

	return(
		<div>
			<label className={classes.Label}>{props.label}</label>
			{inputElement}
			{validationError}
		</div>
	)
}

export default input;