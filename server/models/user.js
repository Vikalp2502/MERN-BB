const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
	{
		name: {
			type: String,
		},
		password: {
			type: String,
		},
		email: {
			type: String,
			unique: true,
		},
		role: {
			type: String,
			default: "user",
		},
		cart: [
			{
				productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
				quantity: { type: Number, default: 1 },
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
