import React from 'react';
import classes from './Backdrop.module.css';

const backdrop = (props) => {

	let content = props.show? <div className={classes.Backdrop} onClick={props.clicked}></div> : null;
	return(content);
}

export default backdrop;