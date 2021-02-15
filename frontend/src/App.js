import {React} from "react";
import { Router, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Apartment from "./pages/Apartment";
import Profile from "./pages/Profile";
import Listing from "./pages/Listing";
import { createBrowserHistory } from "history";

import "./App.css";

function App (){
	let history = createBrowserHistory();
	return(
		<Router history = {history}>
			<div className = "App">
				<Switch>
					{/* disable partial matching */}
					<Route exact path="/" component={HomePage} />
					<Route path="/apartment" component={Apartment} />
					<Route path="/profile" component={Profile} />
					<Route path="/listing" component={Listing} />
				</Switch>
			</div>
		</Router>
	)
}

export default App;
