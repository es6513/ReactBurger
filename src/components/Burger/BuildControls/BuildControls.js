import React, {Component} from "react"; 
import styles from "./BuildControls.scss";
import BuildControl from "./BuildContros/BuildControl";

const controls = [
	{
		label:"Salad",
		type:"salad"
	},
	{
		label:"Bacon",
		type:"bacon"
	},
	{
		label:"Cheese",
		type:"cheese"
	},
	{
		label:"Meat",
		type:"meat"
	}
];

const buildControls = (props)=>(
	<div className={styles.BuildControls}>
		<p>Current Price : <strong>{props.price}</strong></p>
		{controls.map(ctrl=>(
			<BuildControl 
				key={ctrl.label}
				label={ctrl.label} 
				added={() => props.ingredientAdded(ctrl.type)}
				removed={()=>props.ingredientRemoved(ctrl.type)}
				disabled={props.disabled[ctrl.type]}
			 />
		))}
		<button 
			className={styles.OrderButton}
			disabled={!props.purchasable}
			onClick={props.ordered}
		>ORDER NOW</button>
	</div>
);

export default buildControls;