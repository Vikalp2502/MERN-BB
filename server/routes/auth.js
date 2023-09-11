const router = require("express").Router();
const { Login, Signup } = require("../controllers/authController");

router.route("/login").post(Login);
router.route("/signup").post(Signup);

module.exports = router;
