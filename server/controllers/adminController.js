const Product = require("../models/product");
const { successmessage, errormessage } = require("../middlewares/util");

module.exports.Products = async (req, res) => {
	try {
		const data = await Product.find();

		return res.status(200).json(successmessage("Fetched Successfuly!", data));
	} catch (err) {
		return res.status(400).json(errormessage(err.message));
	}
};

module.exports.ProductBySearch = async (req, res) => {
	try {
		const data = await Product.find({
			name: { $regex: req.params.id, $options: "i" },
		});

		return res.status(200).json(successmessage("Fetched Successfuly!", data));
	} catch (err) {
		return res.status(400).json(errormessage(err.message));
	}
};

module.exports.ProductByCategory = async (req, res) => {
	try {
		const data = await Product.find({
			$or: [
				{
					category: req.params.id,
				},
				{
					subcategory: req.params.id,
				},
			],
		});

		return res.status(200).json(successmessage("Fetched Successfuly!", data));
	} catch (err) {
		return res.status(400).json(errormessage(err.message));
	}
};
module.exports.ProductById = async (req, res) => {
	try {
		const data = await Product.findById(req.params.id);

		return res.status(200).json(successmessage("Fetched Successfuly!", data));
	} catch (err) {
		return res.status(400).json(errormessage(err.message));
	}
};

module.exports.addProduct = async (req, res) => {
	try {
		const data = await Product.create(req.body);

		return res.status(200).json(successmessage("Added Successfuly!", data));
	} catch (err) {
		return res.status(400).json(errormessage(err.message));
	}
};

module.exports.updateProduct = async (req, res) => {
	try {
		const data = await Product.findByIdAndUpdate(req.body.id, req.body, {
			new: true,
		});

		return res.status(200).json(successmessage("Updated Successfuly!", data));
	} catch (err) {
		return res.status(400).json(errormessage(err.message));
	}
};

module.exports.deleteProduct = async (req, res) => {
	try {
		const data = await Product.findByIdAndDelete(req.params.id);

		return res.status(200).json(successmessage("Deleted Successfuly!", data));
	} catch (err) {
		return res.status(400).json(errormessage(err.message));
	}
};

module.exports.Categories = async (req, res) => {
	try {
		const products = await Product.find();

		const transformedArray = products.reduce((result, product) => {
			const categoryObj = result.find((item) => item.name === product.category);
			if (categoryObj) {
				if (!categoryObj.subcategories.includes(product.subcategory)) {
					categoryObj.subcategories.push(product.subcategory);
				}
			} else {
				result.push({
					name: product.category,
					subcategories: [product.subcategory],
				});
			}
			return result;
		}, []);

		return res
			.status(200)
			.json(successmessage("Fetched Successfuly!", transformedArray));
	} catch (err) {
		return res.status(400).json(errormessage(err.message));
	}
};
