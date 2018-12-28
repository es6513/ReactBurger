import React, {Component} from "react"; 
import burgerLogo from "../../assets/images/burger-logo.png";
import styles from "./Logo.scss";

const logo = (props)=>(
	<div className={styles.Logo} style={{height:props.height}}>
		<img src={burgerLogo} alt="MyBurger"/>
	</div>
  
);

export default logo;