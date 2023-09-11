import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import ProductCart from "../../Components/ProductCard/Product";
import "./Home.css";
import { GetUser, getProducts } from "../../Services/main";

function HomePage() {
	const [products, setProducts] = useState([]);
	const [ucart, setCart] = useState([]);

	// Group products by category
	const categories = [...new Set(products.map((product) => product.category))];

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			GetUser()
				.then(function (resp) {
					setCart(resp.data?.data?.cart);
				})
				.catch(function (error) {
					toast.error(error?.response?.data?.error);
				});
		}
		getProducts()
			.then(function (resp) {
				setProducts(resp.data?.data);
			})
			.catch(function (error) {
				toast.error(error?.response?.data?.error);
			});
	}, []);

	return (
		<div>
			<Toaster />
			<div className="homepage-container">
				{categories.map((category) => (
					<div key={category} className="category-section">
						<h2>{category}</h2>
						<div className="product-cards">
							{products
								.filter((product) => product.category === category)
								.map((product) => (
									<ProductCart
										id={product._id}
										category={product.category}
										name={product.name}
										image={product.image}
										price={product.price}
										ucart={ucart}
									/>
								))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default HomePage;
