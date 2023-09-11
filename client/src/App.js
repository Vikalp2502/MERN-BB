import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Components & Pages
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Search from "./Pages/Search/Search";
import Admin from "./Pages/Admin/Admin";
import { PrivateRoute } from "./Router/PrivateRoute";

function App() {
	return (
		<Router>
			<div>
				<Navbar />
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/search" component={Search} />
					<PrivateRoute exact path="/admin" component={Admin} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
