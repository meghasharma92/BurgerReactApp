import React, { Component } from 'react';
import classes from './Modal.module.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

	shouldComponentUpdate(prevState, nextProps){
		console.log('nextProps',nextProps);
		console.log('nextProps',prevState);
		return (prevState.show !== this.props.show || prevState.children !== this.props.children);
	}

	render(){
		return(
			<Aux>
				<Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
				<div className={classes.Modal}
				style = {{
				'transform': this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
				'opacity': this.props.show ? '1' : '0'
				}}>
				{this.props.children}
				</div>
			</Aux>
		);
	}

		
}

export default Modal;