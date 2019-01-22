import React, {Component} from "react";
import Aux from "../Auxs/Auxs";
import styles from "./Layout.scss";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import {connect} from "react-redux";


class  Layout extends Component{
	constructor(props) {
		super(props);
		this.state = {showSideDrawer :false};
	}

	sideDrawerClosedHandler=()=>{
		this.setState({showSideDrawer:false});
	}

	sideDrawerToggleHandler=()=>{
		this.setState((prevState)=>{
			return {showSideDrawer:!prevState.showSideDrawer};
		});
	}

	render(){
		return(
			<Aux>
				<Toolbar 
					isAuth = {this.props.isAuthenticated}
					drawerToggleClicked={this.sideDrawerToggleHandler}/>
				<SideDrawer
					isAuth = {this.props.isAuthenticated}
				  open={this.state.showSideDrawer} 
				  closed={this.sideDrawerClosedHandler}/>
				<main className={styles.Content}>
					{this.props.children}
				</main>
			</Aux>
		);
	}
}

const mapStateToProps = state=>{
	return{isAuthenticated:state.auth.token !== null};
};

export default connect(mapStateToProps,null)(Layout);