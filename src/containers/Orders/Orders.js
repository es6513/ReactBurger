import React, {Component} from "react"; 
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends Component {
	state={
		orders:[],
		loading:true
	}

	componentDidMount(){

		
		axios.get("/orders.json")
			.then(response=>{
				this.setState({loading:false});
				let orders = [];
				let fetchedOrders = [];
				for(let key in response.data){
					fetchedOrders.push({
						...response.data[key],
						id:key
					});
				}
				orders = Object.keys(response.data)
					.map(orderNum=>{
						return {
							...response.data[orderNum],
							id:orderNum
						};
						
					});
				this.setState({orders:orders});
				console.log(this.state.orders);
			})
			.catch(error=>{
				this.setState({loading:false});
			});

		// this.setState({
		// 	orders:orders.map(orderInfo=>{
		// 		<Order price={orderInfo[price]} />;
		// 	})
		// });
	
	}

	render() {
		return (
			<div>
				{this.state.orders.map(orderInfo=>{
					return <Order 
						key={orderInfo.id} 
						ingredients={orderInfo.ingredients}
						price={orderInfo.price} />;
				})}
			</div>
		);
	}
}
Orders = withErrorHandler(Orders,axios);

export default Orders;
