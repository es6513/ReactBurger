import React, { Component } from "react";
import Aux from "../../hoc/Auxs/Auxs";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from"../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import {connect} from "react-redux";
import * as actionTypes from "../../store/action";


const INGREDIENT_PRICES = {
	salad:0.5,
	cheese:0.4,
	meat:1.3,
	bacon:0.7
};

const round = (value,decimals)=>{
	return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
};

class BurgerBuilder extends Component {
	constructor(props) {
		super(props);
		this.state = {
			purchasing:false,
			loading:false,
			error:null
		};
	}

	componentDidMount(){
		// axios.get("https://react-burger-32f97.firebaseio.com/ingredients.json")
		// 	.then(response=>{
		// 		this.setState({ingredients:response.data});
		// 		this.updatePurchaseState(this.state.ingredients);
		// 	})
		// 	.catch(err=>{
		// 		this.setState({error:true});
		// 	});
	}

	updatePurchaseState(ingredients){

		const sum = Object.keys(ingredients)
			.map(igKey=>{
				return ingredients[igKey];
			})
			.reduce((sum,el)=>{
				return sum + el;
			},0);

		return sum > 0;

	}

	purchaseHandler = () =>{
		this.setState({purchasing:true});
	}

	purchaseCancelHandeler = () =>{
		this.setState({purchasing:false});
	}

	puchaseContinueHandler = () =>{

		this.props.history.push("/checkout");
	}
	
	render() {
		const disabledInfo = {...this.props.ings};

		for(let key in disabledInfo){
			disabledInfo[key] = disabledInfo[key] <= 0;
		}
		let orderSummary = null;
		let burger = this.state.error ? <p>Can not find ingredients!</p> : <Spinner />;

		if(this.props.ings){
			burger = (
				<Aux>
					<Burger ingredients={this.props.ings}/>
					<BuildControls 
						ingredientAdded={this.props.onIngredientAdded}
						ingredientRemoved={this.props.onIngredientRemoved}
						// priceUpdated={this.props.onPriceUpdated}
						disabled ={disabledInfo}
						purchasable={this.updatePurchaseState(this.props.ings)}
						ordered={this.purchaseHandler}
						price={this.props.price}
					/>
				</Aux>
			);
			orderSummary = <OrderSummary 
				ingredients={this.props.ings} 
				price={this.props.price}
				puchaseCancelled={this.purchaseCancelHandeler}
				puchaseContinued ={this.puchaseContinueHandler}
			/>;
		}
		if(this.state.loading){
			orderSummary = <Spinner />;
		}
		return (
			<Aux>
				<Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandeler}>
					{orderSummary}
				</Modal>
				{burger}
			</Aux>	
		);
	}
}

const mapStateToProps = state =>{
	return{
		ings:state.ingredients,
		price:state.totalPrice
	};
};

const mapDispatchToProps = dispatch =>{
	return{
		onIngredientAdded:(ingName)=>dispatch({
			type:actionTypes.ADD_INGREDIENT,
			ingredientName:ingName
		}),
		onIngredientRemoved:(ingName)=>dispatch({
			type:actionTypes.REMOVE_INGREDIENT,
			ingredientName:ingName
		}),
		onPriceUpdated:(ingName,calcuType)=>dispatch({
			type:actionTypes.UPDATE_PRICE,
			ingsPrice:INGREDIENT_PRICES[ingName],
			calcuType:calcuType
		})
	};
};

BurgerBuilder = connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));

export default BurgerBuilder;