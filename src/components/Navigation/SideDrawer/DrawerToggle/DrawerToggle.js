import React, {Component} from "react"; 
import styles from "./DrawerToggle.scss";

const drawerToggle = (props)=>(
	<div className={styles.DrawerToggle} onClick={props.clicked}>
		<div></div>
		<div></div>
		<div></div>
	</div>
);

export default drawerToggle; 