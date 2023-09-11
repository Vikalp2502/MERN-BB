const User = require("../models/user");
const { successmessage, errormessage } = require("../middlewares/util");

module.exports.GetProfile = async (req, res) => {
	try {
		const user = await User.findById(req.user.id);

		return res.status(200).json(successmessage("Fetched Successfuly!", user));
	} catch (err) {
		return res.status(400).json(errormessage(err.message));
	}
};

module.exports.UpdateCart = async (req, res) => {
	try {
		const data = await User.findByIdAndUpdate(req.user.id, req.body, {
			new: true,
		});

		return res.status(200).json(successmessage("Updated Successfuly!", data));
	} catch (err) {
		return res.status(400).json(errormessage(err.message));
	}
};
