const User = require("../models/user");
const {
	successmessage,
	generateToken,
	hashPassword,
	verifypassword,
	errormessage,
} = require("../middlewares/util");

module.exports.Signup = async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email });
		if (user) {
			return res
				.status(400)
				.json(errormessage("User with this Email already exists!"));
		}

		req.body.password = hashPassword(req.body.password);

		var newUser = await User.create(req.body);
		const token = generateToken({ id: newUser._id, role: "user" });
		var result = { token, role: "user" };

		return res
			.status(200)
			.json(successmessage("Register Successfully", result));
	} catch (err) {
		return res.status(400).json(errormessage(err.message));
	}
};

module.exports.Login = async (req, res) => {
	try {
		const { email, password } = req.body;
		var user = await User.findOne({ email: email });

		if (!user) {
			return res.status(400).json(errormessage("User does not exists"));
		}
		const verify = verifypassword(password, user.password);

		if (!verify) {
			return res.status(400).json(errormessage("Invalid Credentials"));
		}

		const token = generateToken({ id: user._id, role: user.role });

		return res.status(200).json(
			successmessage("Logged In Successfuly!", {
				token,
				role: user.role,
			})
		);
	} catch (err) {
		return res.status(400).json(errormessage(err.message));
	}
};
