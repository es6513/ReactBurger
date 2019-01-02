import React from "react"; 
import ReactDOM from "react-dom"; 
import "./index.scss";
import App from "../src/App";
import {BrowserRouter,HashRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {createStore} from "redux";
import reducer from "./store/reducer";

const store = createStore(reducer);

const app = (
	<Provider store={store}>
		<HashRouter>
			<App />
		</HashRouter>
	</Provider>

);


ReactDOM.render(
	app,
	document.getElementById("root")
);
