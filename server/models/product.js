const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
	{
		name: {
			type: String,
		},
		price: {
			type: String,
		},
		image: {
			type: String,
		},
		category: {
			type: String,
		},
		subcategory: {
			type: String,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Products", ProductSchema);
