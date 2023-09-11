import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import ProductCart from "../../Components/ProductCard/Product";
import "./Search.css";
import {
	GetUser,
	getProducts,
	getProductsBySearch,
	getProductsBySubCat,
} from "../../Services/main";

function Search() {
	const [products, setProducts] = useState([]);
	const [ucart, setCart] = useState([]);
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);

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
		getData();
	}, []);

	async function getData() {
		if (queryParams.get("query")) {
			getProductsBySearch({ search: queryParams.get("query") })
				.then(function (resp) {
					setProducts(resp.data?.data);
				})
				.catch(function (error) {
					toast.error(error?.response?.data?.error);
				});
		} else if (queryParams.get("category")) {
			getProductsBySubCat({ subcat: queryParams.get("category") })
				.then(function (resp) {
					setProducts(resp.data?.data);
				})
				.catch(function (error) {
					toast.error(error?.response?.data?.error);
				});
		} else {
			getProducts()
				.then(function (resp) {
					setProducts(resp.data?.data);
				})
				.catch(function (error) {
					toast.error(error?.response?.data?.error);
				});
		}
	}

	return (
		<div>
			<Toaster />
			<div className="homepage-container">
				<h3>All Products</h3>
				<div className="product-list">
					{products.map((product, index) => (
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
		</div>
	);
}

export default Search;
