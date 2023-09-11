import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { UpdateCart } from "../../Services/main";
import "./Product.css";

function Product({ id, image, name, price, category, ucart }) {
	const [quantity, setQuantity] = useState(0);
	const [token, setTokenExists] = useState(false);
	const [isAddedToCart, setIsAddedToCart] = useState(false);

	const handleAddToCart = () => {
		if (!token) {
			toast.error("Please login first");
		} else {
			let cart = [];
			let message = "";
			if (ucart.length > 0) {
				cart = ucart;
				console.log(cart);
				const existingCartItem = cart.find(
					(item) => item.productId.toString() === id.toString()
				);
				if (existingCartItem) {
					existingCartItem.quantity += 1;
					message = "Quantity of this item has been increased";
				} else {
					message = "An item has been added to your basket successfully";
					cart.push({ productId: id, quantity: quantity + 1 });
				}
			} else {
				message = "An item has been added to your basket successfully";
				cart.push({ productId: id, quantity: quantity + 1 });
			}
			setIsAddedToCart(true);
			setQuantity(quantity + 1);
			UpdateCart({ cart })
				.then(function (resp) {
					ucart = resp.data?.data?.cart;
					toast.success(message);
				})
				.catch(function (error) {
					toast.error(error?.response?.data?.error);
				});
		}
	};

	const handleRemoveFromCart = () => {
		let cart = ucart;
		let message = "";

		if (quantity > 0) {
			setQuantity(quantity - 1);
			const existingCartItem = cart.find(
				(item) => item.productId.toString() === id.toString()
			);
			if (existingCartItem) {
				existingCartItem.quantity -= 1;
				message = "Quantity of this item has been reduced";
			}
		}

		if (quantity === 1) {
			setIsAddedToCart(false);
			message = "An item has been removed from your basket successfully";
			cart = cart.filter((e) => e.productId.toString() !== id.toString());
		}
		UpdateCart({ cart })
			.then(function (resp) {
				ucart = resp.data?.data?.cart;
				toast.success(message);
			})
			.catch(function (error) {
				toast.error(error?.response?.data?.error);
			});
	};

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			setTokenExists(true);
		}
		if (ucart.length > 0) {
			const existingCartItem = ucart.find(
				(item) => item.productId.toString() === id.toString()
			);
			if (existingCartItem) {
				setQuantity(existingCartItem.quantity);
				if (existingCartItem.quantity > 0) {
					setIsAddedToCart(true);
				}
			}
		}
	}, [ucart, id]);

	return (
		<>
			<Toaster />
			<div key={id} className="product-card">
				<img src={image} alt={name} />
				<h6>{category}</h6>
				<h3>{name}</h3>
				<p>{price}</p>
				{isAddedToCart ? (
					<div>
						<button onClick={handleRemoveFromCart} className="cart-counter">
							-
						</button>
						<span>
							{"  "}
							{quantity}
							{"  "}
						</span>
						<button onClick={handleAddToCart} className="cart-counter">
							+
						</button>
					</div>
				) : (
					<button className="cart-button" onClick={handleAddToCart}>
						Add To Cart
					</button>
				)}
			</div>
		</>
	);
}

export default Product;
