import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../../Assets/logo.png";
import cart from "../../Assets/cart.png";
import { Modal } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import LoginForm from "../../Pages/Auth/Auth";
import { GetUser, getCategories } from "../../Services/main";

function Navbar() {
	const [searchQuery, setSearchQuery] = useState("");
	const [cartCount, setCartCount] = useState(0);
	const [show, setShow] = useState(false);
	const [name, setName] = useState("");
	const [role, setRole] = useState("user");
	const [tokenExists, setTokenExists] = useState(false);
	const [isMenuOpen, setMenuOpen] = useState(false);
	const [categories, setCategories] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState(null);

	const toggleMenu = () => {
		setMenuOpen(!isMenuOpen);
		setSelectedCategory(categories[0]);
	};

	const handleCategoryHover = (category) => {
		setSelectedCategory(category);
	};

	const handleCategoryClick = (category) => {
		setSelectedCategory(category);
		window.location.href = `/search?category=${category.name}`;
	};

	const handleSubcategoryClick = (subcategory) => {
		window.location.href = `/search?category=${subcategory}`;
	};

	const handleClose = () => {
		setShow(false);
		const token = localStorage.getItem("token");
		if (token) {
			setTokenExists(true);
			const name = localStorage.getItem("name");
			setName(name);
			const role = localStorage.getItem("role");
			setRole(role);
		}
	};

	const handleShow = () => setShow(true);

	const handleSearchInputChange = (event) => {
		setSearchQuery(event.target.value);
	};

	const handleSearchKeyPress = (event) => {
		if (event.key === "Enter") {
			window.location.href = `/search?query=${searchQuery}`;
		}
	};

	const handleLogout = () => {
		localStorage.removeItem("name");
		localStorage.removeItem("role");
		localStorage.removeItem("token");
		setTokenExists(false);
		window.location.reload();
	};

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			setTokenExists(true);
			const name = localStorage.getItem("name");
			setName(name);
			const role = localStorage.getItem("role");
			setRole(role);
			GetUser()
				.then(function (resp) {
					setCartCount(resp.data?.data?.cart.length);
				})
				.catch(function (error) {
					toast.error(error?.response?.data?.error);
				});
		} else {
			setTokenExists(false);
		}

		getCategories()
			.then(function (resp) {
				setCategories(resp.data?.data);
			})
			.catch(function (error) {
				toast.error(error?.response?.data?.error);
			});
	}, []);

	return (
		<nav className="navbar">
			<Toaster />
			<div className="navbar-container">
				<Link to="/">
					<div className="navbar-logo">
						<img src={logo} alt="Logo" width="40px" />
					</div>
				</Link>

				{role === "user" ? (
					<>
						<div className="navbar-category">
							<button onClick={toggleMenu}>
								<span className="sp1">Shop by</span>
								<br />
								<span className="sp2">Category</span>
							</button>
							{isMenuOpen && (
								<div className="menu-content">
									<div className="menu-column cat">
										{categories.map((category) => (
											<div
												key={category.name}
												className="category"
												onMouseEnter={() => handleCategoryHover(category)}
												onClick={() => handleCategoryClick(category)}
											>
												{category.name}
											</div>
										))}
									</div>
									<div className="menu-column subcat">
										{selectedCategory && (
											<div>
												<h3>{selectedCategory.name}</h3>
												<ul>
													{selectedCategory.subcategories.map((subcategory) => (
														<li
															key={subcategory}
															className="subcategory"
															onClick={() =>
																handleSubcategoryClick(subcategory)
															}
														>
															{subcategory}
														</li>
													))}
												</ul>
											</div>
										)}
									</div>
								</div>
							)}
						</div>
						<div className="navbar-search">
							<input
								type="text"
								placeholder="Search Products..."
								value={searchQuery}
								onChange={handleSearchInputChange}
								onKeyPress={handleSearchKeyPress}
							/>
						</div>
					</>
				) : (
					<></>
				)}
				<div className="navbar-login">
					{tokenExists === false ? (
						<button onClick={handleShow}>Login / Signup</button>
					) : (
						<button onClick={handleLogout}>Hi! {name}, Logout</button>
					)}
				</div>
				{role === "user" ? (
					<>
						<div className="navbar-cart">
							<img src={cart} alt="Cart" width="30px" />
							<div className="cart-count">
								{cartCount === 0
									? "0 Item"
									: cartCount === 1
									? "1 Item"
									: `${cartCount} Items`}
							</div>
						</div>
					</>
				) : (
					<></>
				)}

				<Modal centered show={show} onHide={handleClose}>
					<Modal.Header closeButton className="modal-title">
						Login / Signup
					</Modal.Header>
					<Modal.Body>
						<LoginForm onClose={handleClose} />
					</Modal.Body>
				</Modal>
			</div>
		</nav>
	);
}

export default Navbar;
