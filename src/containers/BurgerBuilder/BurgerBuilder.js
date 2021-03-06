import React, { Component } from "react";
import Aux from "../../hoc/Auxs/Auxs";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from"../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";


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
			ingredients:null,
			totalPrice:4,
			purchasable:false,
			purchasing:false,
			loading:false,
			error:null
		};
	}

	componentDidMount(){
		axios.get("https://react-burger-32f97.firebaseio.com/ingredients.json")
			.then(response=>{
				this.setState({ingredients:response.data});
				this.updatePurchaseState(this.state.ingredients);
			})
			.catch(err=>{
				this.setState({error:true});
			});
	}

	updatePurchaseState(ingredients){

		const sum = Object.keys(ingredients)
			.map(igKey=>{
				return ingredients[igKey];
			})
			.reduce((sum,el)=>{
				return sum + el;
			},0);

		this.setState({purchasable:sum > 0});

	}

	addIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		const updatedCount = oldCount + 1;
		const updatedIngredients = {...this.state.ingredients};
		updatedIngredients[type] = updatedCount;
		const priceAddition = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = round(oldPrice + priceAddition,1);
		this.setState({
			totalPrice:newPrice,
			ingredients:updatedIngredients
		});
		this.updatePurchaseState(updatedIngredients);
	}

	removeIngredientHandler =(type)=>{
		const oldCount = this.state.ingredients[type];
		const updatedCount = oldCount - 1;
		const updatedIngredients = {...this.state.ingredients};
		updatedIngredients[type] = updatedCount;
		const priceDeduction = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = round(oldPrice - priceDeduction,1);
		this.setState({
			totalPrice:newPrice,
			ingredients:updatedIngredients
		});
		this.updatePurchaseState(updatedIngredients);
	}

	purchaseHandler = () =>{
		this.setState({purchasing:true});
	}

	purchaseCancelHandeler = () =>{
		this.setState({purchasing:false});
	}

	puchaseContinueHandler = () =>{
		
		const queryParams = [];
		for(let i in this.state.ingredients){
			queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i]));
		}
		queryParams.push("price=" + this.state.totalPrice);
		const queryString = queryParams.join("&");
		this.props.history.push({
			pathname:"/checkout",
			search:"?" + queryString
		});
	}
	
	render() {
		const disabledInfo = {...this.state.ingredients};

		for(let key in disabledInfo){
			disabledInfo[key] = disabledInfo[key] <= 0;
		}
		let orderSummary = null;
		let burger = this.state.error ? <p>Can not find ingredients!</p> : <Spinner />;

		if(this.state.ingredients){
			burger = (
				<Aux>
					<Burger ingredients={this.state.ingredients}/>
					<BuildControls 
						ingredientAdded={this.addIngredientHandler}
						ingredientRemoved={this.removeIngredientHandler}
						disabled ={disabledInfo}
						purchasable={this.state.purchasable}
						ordered={this.purchaseHandler}
						price={this.state.totalPrice}
					/>
				</Aux>
			);
			orderSummary = <OrderSummary 
				ingredients={this.state.ingredients} 
				price={this.state.totalPrice}
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

BurgerBuilder = withErrorHandler(BurgerBuilder,axios);

export default BurgerBuilder;