import React, {Component} from "react"; 
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";
import {connect} from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";


class Orders extends Component {

	componentDidMount(){
		this.props.onFetchOrders();
		// axios.get("/orders.json")
		// 	.then(response=>{
		// 		this.setState({loading:false});
		// 		let orders = [];
		// 		let fetchedOrders = [];
		// 		for(let key in response.data){
		// 			fetchedOrders.push({
		// 				...response.data[key],
		// 				id:key
		// 			});
		// 		}
		// 		orders = Object.keys(response.data)
		// 			.map(orderNum=>{
		// 				return {
		// 					...response.data[orderNum],
		// 					id:orderNum
		// 				};
		// 			});
		// 		this.setState({orders:orders});
		// 	})
		// 	.catch(error=>{
		// 		this.setState({loading:false});
		// 	});

		// this.setState({
		// 	orders:orders.map(orderInfo=>{
		// 		<Order price={orderInfo[price]} />;
		// 	})
		// });
	
	}

	render() {
		let orders = <Spinner />;
		if(!this.props.loading){
			orders = this.props.orders.map(orderInfo=>{
				return <Order 
					key={orderInfo.id} 
					ingredients={orderInfo.ingredients}
					price={orderInfo.price} />;
			});
		}
		return (
			<div>
				{orders}
			</div>
		);
	}
}

const mapStateToProps = state=>{
	return{
		orders:state.order.orders,
		loading:state.order.loading
	};
};

const mapDispatchToProps = dispatch=>{
	return{onFetchOrders: ()=> dispatch(actions.fetchOrders())};
};

Orders = connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios));

export default Orders;
