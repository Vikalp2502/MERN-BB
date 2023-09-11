import { useState } from "react";

function Form(props) {
	const [product, setProduct] = useState(props.data);

	let changeFormData = (event) => {
		const { name, value } = event.target;
		setProduct({ ...product, [name]: value });
	};

	return (
		<div className="form-overlay">
			<form>
				<div className="form-group">
					<label>Name:</label>
					<input
						className="form-control mt-2"
						value={product.name}
						type="text"
						name="name"
						placeholder="Enter Name"
						onChange={changeFormData}
						required
					/>
				</div>
				<div className="form-group">
					<label>Price:</label>
					<input
						className="form-control mt-2"
						value={product.price}
						onChange={changeFormData}
						type="number"
						name="price"
						placeholder="Enter Price"
						required
					/>
				</div>
				<div className="form-group">
					<label>Category:</label>
					<input
						className="form-control mt-2"
						name="category"
						type="text"
						value={product.category}
						onChange={changeFormData}
						placeholder="Enter Category"
						required
					/>
				</div>
				<div className="form-group">
					<label>Sub-Category:</label>
					<input
						className="form-control mt-2"
						name="subcategory"
						type="text"
						value={product.subcategory}
						onChange={changeFormData}
						placeholder="Enter Sub-Category"
						required
					/>
				</div>
				<div className="form-group">
					<label>Image URL:</label>
					<input
						className="form-control mt-2"
						name="image"
						type="text"
						value={product.image}
						onChange={changeFormData}
						placeholder="Enter Image URL"
						required
					/>
				</div>

				<button
					className="btn btn-primary float-end"
					onClick={(e) => {
						e.preventDefault();
						if (
							!!product.name &&
							!!product.price &&
							!!product.category &&
							!!product.subcategory &&
							!!product.image
						) {
							props.add(product);
						}
					}}
				>
					Submit
				</button>
				<button
					className="btn btn-danger float-end"
					onClick={(e) => {
						e.preventDefault();
						props.close();
					}}
				>
					Cancel
				</button>
			</form>
		</div>
	);
}

export default Form;
