import React, {Component} from "react"; 
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import styles from "./SideDrawer.scss";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Auxs/Auxs";

const sideDrawer = (props)=>{
	let attachedClasses = [styles.SideDrawer,styles.Close];

	if(props.open){
		attachedClasses = [styles.SideDrawer,styles.Open];
	}

	return(
		<Aux>
			<Backdrop show={props.open} clicked={props.closed}/>
			<div className={attachedClasses.join(" ")}>
				<div className={styles.Logo}>
					<Logo />
				</div>
				<nav>
					<NavigationItems isAuthenticated={props.isAuth}/>
				</nav>
			</div>
		</Aux>

	);
};

export default sideDrawer;