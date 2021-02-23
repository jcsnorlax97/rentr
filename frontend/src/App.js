import {React} from "react";
import { Router, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Apartment from "./pages/Apartment";
import Profile from "./pages/Profile";
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
				</Switch>
			</div>
		</Router>
	)
}

export default App;
