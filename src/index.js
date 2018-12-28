import React from "react"; 
import ReactDOM from "react-dom"; 
import "./index.scss";
import App from "../src/App";
import {BrowserRouter} from "react-router-dom";


const app = (
	<BrowserRouter>
		<App />
	</BrowserRouter>
);


ReactDOM.render(
	app,
	document.getElementById("root")
);
