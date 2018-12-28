import React, {Component} from "react"; 
import styles from "./Button.scss";


const button = (props)=>(
	<button
		disabled={props.disabled}
		className={[styles.Button, styles[props.btnType]].join(" ")}
		onClick={props.clicked}
	>{props.children}</button>

);

export default button;