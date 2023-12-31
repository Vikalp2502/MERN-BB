import React from "react";
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={(props) =>
			localStorage.getItem("token") !== null &&
			localStorage.getItem("role") === "admin" ? (
				<Component {...props} />
			) : (
				<Redirect to={{ pathname: "/", state: { from: props.location } }} />
			)
		}
	/>
);
