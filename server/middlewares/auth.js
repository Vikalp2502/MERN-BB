const { errormessage, successmessage } = require("./util");
const jwt = require("jsonwebtoken");

exports.auth = async (req, res, next) => {
	try {
		var token = "";
		if (
			req.headers.authorization &&
			req.headers.authorization.startsWith("Bearer")
		) {
			token = req.headers.authorization.split(" ")[1];
		}
		if (!token) {
			return res.status(400).json(errormessage("Token not present!"));
		}

		let userid = jwt.verify(token, process.env.JWT_SECRET);

		req.user = userid;
		next();
	} catch (err) {
		console.log(err);
		res.status(400).json(errormessage(err.message));
	}
};

exports.accessUser = async (req, res, next) => {
	try {
		if (req.user.role !== "user") {
			return res.status(400).json("Only user can access");
		}

		next();
	} catch (err) {
		console.log(err);
		res.status(400).json(errormessage(err.message));
	}
};

exports.accessAdmin = async (req, res, next) => {
	try {
		if (req.user.role !== "admin") {
			return res.status(400).json("Only user can access");
		}

		next();
	} catch (err) {
		console.log(err);
		res.status(400).json(errormessage(err.message));
	}
};
