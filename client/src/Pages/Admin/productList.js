function ProductList({ products, deleteProduct, editProduct }) {
	return (
		<table className="table m-3">
			<thead className="header">
				<tr>
					<th>ID</th>
					<th>Name</th>
					<th>Price</th>
					<th>Category</th>
					<th>Sub-Category</th>
					<th>Image URL</th>
					<th></th>
				</tr>
			</thead>
			<tbody className="body">
				{products.map((data) => (
					<tr key={data._id}>
						<td>{data._id}</td>
						<td>{data.name}</td>
						<td>{data.price}</td>
						<td>{data.category}</td>
						<td>{data.subcategory}</td>
						<td>{data.image}</td>
						<td>
							<button
								className="btn btn-primary m-1"
								onClick={() => editProduct(data)}
							>
								Edit
							</button>
							<button
								className="btn btn-danger m-1"
								onClick={() => deleteProduct(data._id)}
							>
								Delete
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}

export default ProductList;
