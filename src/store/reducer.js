import * as actionTypes from "./action";

const initialState = {
	ingredients:{
		salad:0,
		bacon:0,
		cheese:0,
		meat:0
	},
	totalPrice:4,
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

const reducer = (state = initialState,action)=>{
	switch(action.type){
	case actionTypes.ADD_INGREDIENT:
		return{
			...state,
			ingredients:{
				...state.ingredients,
				[action.ingredientName]:state.ingredients[action.ingredientName] + 1
			},
			totalPrice:round(state.totalPrice + INGREDIENT_PRICES[action.ingredientName],1)
		};
		//for update data in immutable way
	case actionTypes.REMOVE_INGREDIENT:
		
		return{
			...state,
			ingredients:{
				...state.ingredients,
				[action.ingredientName]:state.ingredients[action.ingredientName] - 1
			},
			totalPrice:round(state.totalPrice - INGREDIENT_PRICES[action.ingredientName],1)
		};

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
	default:
		return state;
	}
};

export default reducer;