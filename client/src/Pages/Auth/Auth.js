import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { RegisterUser, LoginUser, GetUser } from "../../Services/main";
import "./Auth.css";

function LoginForm({ onClose }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [isLogin, setLogin] = useState(true);

	const handleSignup = () => setLogin(false);
	const handleLogin = () => setLogin(true);

	const handleLoginSubmit = async (e) => {
		e.preventDefault();

		LoginUser({
			email: email,
			password: password,
		})
			.then(function (response) {
				toast.success(response?.data?.message);
				localStorage.setItem("token", response?.data?.data?.token);
				localStorage.setItem("role", response?.data?.data?.role);
				if (response?.data?.data?.role === "user") {
					GetUser()
						.then(function (resp) {
							localStorage.setItem(
								"name",
								resp?.data?.data?.name.split(" ")[0]
							);
							window.location.reload();
							onClose();
						})
						.catch(function (error) {
							toast.error(error?.response?.data?.error);
						});
				} else {
					localStorage.setItem("name", "Admin");
					window.location.href = "/admin";
				}
			})
			.catch(function (error) {
				toast.error(error?.response?.data?.error);
			});
	};

	const handleSignupSubmit = async (e) => {
		e.preventDefault();

		RegisterUser({
			name: name,
			email: email,
			password: password,
		})
			.then(function (response) {
				toast.success(response?.data?.message);
				localStorage.setItem("token", response?.data?.data?.token);
				localStorage.setItem("role", response?.data?.data?.role);
				if (response?.data?.data?.role === "user") {
					GetUser()
						.then(function (resp) {
							localStorage.setItem("name", resp?.data?.data.name.split(" ")[0]);
							window.location.reload();
							onClose();
						})
						.catch(function (error) {
							toast.error(error?.response?.data?.error);
						});
				} else {
					localStorage.setItem("name", "Admin");
					window.location.href = "/admin";
				}
			})
			.catch(function (error) {
				toast.error(error?.response?.data?.error);
			});
	};

	return (
		<div className="auth-container">
			<Toaster />
			{isLogin ? (
				<>
					<form onSubmit={handleLoginSubmit}>
						<div className="form-group">
							<label htmlFor="email">Email:</label>
							<input
								type="email"
								id="email"
								placeholder="Enter your email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</div>
						<div className="form-group">
							<label htmlFor="password">Password:</label>
							<input
								type="password"
								id="password"
								placeholder="Enter your password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</div>
						<button type="submit" className="auth-button">
							Login
						</button>
					</form>
					<p className="signup-link">
						Don't have an account?{" "}
						<span className="a" onClick={handleSignup}>
							Sign up
						</span>
					</p>
				</>
			) : (
				<>
					<form onSubmit={handleSignupSubmit}>
						<div className="form-group">
							<label htmlFor="name">Name:</label>
							<input
								type="name"
								id="name"
								placeholder="Enter your name"
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
							/>
						</div>
						<div className="form-group">
							<label htmlFor="email">Email:</label>
							<input
								type="email"
								id="email"
								placeholder="Enter your email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</div>
						<div className="form-group">
							<label htmlFor="password">Password:</label>
							<input
								type="password"
								id="password"
								placeholder="Enter your password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</div>

						<button type="submit">Sign Up</button>
					</form>
					<p className="signup-link">
						Already have an account?{" "}
						<span className="a" onClick={handleLogin}>
							Login
						</span>
					</p>
				</>
			)}
		</div>
	);
}

export default LoginForm;
