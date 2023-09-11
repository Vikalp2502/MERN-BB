const router = require("express").Router();
const { auth, accessUser } = require("../middlewares/auth");
const { GetProfile, UpdateCart } = require("../controllers/userController");

router.route("/getProfile").get(auth, GetProfile);
router.route("/updateCart").post(auth, UpdateCart);

module.exports = router;
