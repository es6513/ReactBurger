import React, {Component} from "react"; 
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import styles from "./CheckoutSummary.scss";

const checkoutSummary = (props)=>{
	return(
		<div className={styles.CheckoutSummary}>
			<h1>We hope it tastes well</h1>
			<div style={{
				width:"100%",
				margin:"auto"
			}}>
				<Burger ingredients={props.ingredients}/>
			</div>
			<Button 
				btnType="Danger" 
				clicked={props.checkoutCancelled}
			>CANCEL</Button>
			<Button 
				btnType="Success" 
				clicked={props.checkoutContinued}
			>CONTINUE</Button>
		</div>
	);
};


export default checkoutSummary;