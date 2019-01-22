import * as actionTypes from "../actions/actionTypes";
import {updateObject} from "../utility";

const initialState = {
	ingredients:null,
	totalPrice:4,
	error:false,
	building:false
};

const INGREDIENT_PRICES = {
	salad:0.5,
	cheese:0.4,
	meat:1.3,
	bacon:0.7
};


const round = (value,decimals)=>{
	return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
};

const addIngredient = (state,action)=>{
	const updatedIngredient = {	[action.ingredientName]:state.ingredients[action.ingredientName] + 1};
	const updatedIngredients = updateObject(state.ingredients,updatedIngredient);
	const updatedState = {
		ingredients:updatedIngredients,
		totalPrice:round(state.totalPrice + INGREDIENT_PRICES[action.ingredientName],1),
		building:true	
	};
	return updateObject(state,updatedState);
	//for update data in immutable way
};

const removeIngredient = (state,action)=>{
	const updatedIng = {	[action.ingredientName]:state.ingredients[action.ingredientName] - 1};
	const updatedIngs = updateObject(state.ingredients,updatedIng);
	const updatedSt = {
		ingredients:updatedIngs,
		totalPrice:round(state.totalPrice - INGREDIENT_PRICES[action.ingredientName],1),
		building:true		
	};
	return updateObject(state,updatedSt);
};

const setIngredients = (state,action)=>{
	let addtionalPrice = 0;
	for(let ings in action.ingredients){
		addtionalPrice = addtionalPrice + action.ingredients[ings] * [INGREDIENT_PRICES[ings]];
	}
	return updateObject(state,{
		ingredients:{
			salad:action.ingredients.salad,
			bacon:action.ingredients.bacon,
			cheese:action.ingredients.cheese,
			meat:action.ingredients.meat
		},
		totalPrice:4 + addtionalPrice,
		error:false,
		building:false
	});
};

const fetchIngredientsFailed = (state,action)=>{
	return updateObject(state,{
		...state,
		error:true
	});
};

const reducer = (state = initialState,action)=>{
	switch(action.type){

	case actionTypes.ADD_INGREDIENT: return addIngredient(state,action);
		
	case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state,action);
	
	//other way to update price 
	case actionTypes.UPDATE_PRICE:
		
		let updatedPrice;
		if(action.calcuType === "add"){
			updatedPrice = round(state.totalPrice + action.ingsPrice,1);
		}
		if(action.calcuType === "minus"){
			updatedPrice = round(state.totalPrice - action.ingsPrice,1);
		}

		return{
			...state,
			totalPrice:updatedPrice
		};

	case actionTypes.SET_INGREDIENTS: return setIngredients(state,action);
	case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state,action);
	default:
		return state;
	}
};

export default reducer;