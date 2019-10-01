import React, { Component } from 'react';
import Aux from '../Aux/Aux';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

	state = {
		showSideDrawer: false
	}

	sideDrawerCloseHandler = () => {
			this.setState({showSideDrawer: false})
	}

	sideDrawerToggleClosed = () => {
		this.setState((prevState)=> {
		 return	{ showSideDrawer: !prevState.showSideDrawer}
			}
		)
	}

	render(){
		return(
				<Aux>
					<Toolbar drawerToggleClicked={this.sideDrawerToggleClosed} />
					<SideDrawer 
						open={this.state.showSideDrawer}
						closed={this.sideDrawerCloseHandler} />
					<div className={classes.Content} >
						{this.props.children}
					</div>
				</Aux>
			);
	}

}

export default Layout;