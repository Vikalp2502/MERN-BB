import React from "react";
import toast, { Toaster } from "react-hot-toast";
import ProductList from "./productList";
import {
	getProducts,
	addProducts,
	updateProducts,
	deleteProducts,
} from "../../Services/main.js";
import { useEffect, useState } from "react";
import ProductForm from "./Form";
import "./Admin.css";

const Admin = () => {
	const [products, setProducts] = useState([]);
	const [edit, setEdit] = useState(false);
	const [openForm, setOpenForm] = useState(false);
	const [initialForm, setForm] = useState({
		name: "",
		price: "",
		category: "",
		subcategory: "",
		image: "",
	});
	useEffect(() => {
		getAllProducts();
	}, []);

	async function getAllProducts() {
		getProducts()
			.then(function (response) {
				setProducts(response.data.data);
			})
			.catch(function (error) {
				toast.error(error?.response?.data?.error);
			});
	}
	async function addProduct(product) {
		let data = {
			id: product._id,
			name: product.name,
			price: product.price,
			category: product.category,
			subcategory: product.subcategory,
			image: product.image,
		};
		if (edit) {
			await updateProducts(data)
				.then(function (response) {
					getAllProducts();
					setOpenForm(false);
					toast.success("Product updated successfully");
				})
				.catch(function (error) {
					toast.error(error?.response?.data?.error);
				});
		} else {
			addProducts(data)
				.then(function (response) {
					getAllProducts();
					setOpenForm(false);
					toast.success("Product added successfully");
				})
				.catch(function (error) {
					toast.error(error?.response?.data?.error);
				});
		}
	}
	async function deleteProduct(id) {
		deleteProducts(id)
			.then(function (response) {
				getAllProducts();
				toast.success("Product deleted successfully");
			})
			.catch(function (error) {
				toast.error(error?.response?.data?.error);
			});
	}

	function editProduct(value) {
		setEdit(true);
		setOpenForm(true);
		setForm(value);
	}
	function closeForm() {
		setOpenForm(false);
	}
	function showForm() {
		setForm({ name: "", price: "", category: "", subcategory: "", image: "" });
		setOpenForm(true);
		setEdit(false);
	}

	return (
		<div className="list-container">
			<Toaster />
			<h2 className="text-center heading">Products</h2>
			<button
				className="btn btn-primary float-end"
				onClick={() => {
					showForm();
				}}
			>
				Add new
			</button>
			<ProductList
				products={products}
				deleteProduct={deleteProduct}
				editProduct={editProduct}
			></ProductList>
			{openForm && (
				<ProductForm
					add={addProduct}
					data={initialForm}
					close={closeForm}
				></ProductForm>
			)}
		</div>
	);
};

export default Admin;
