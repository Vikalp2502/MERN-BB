const router = require("express").Router();
const { auth, accessAdmin } = require("../middlewares/auth");
const controller = require("../controllers/adminController");

router
	.route("/product")
	.get(controller.Products)
	.post(auth, accessAdmin, controller.addProduct)
	.patch(auth, accessAdmin, controller.updateProduct);
router
	.route("/product/:id")
	.get(controller.ProductById)
	.delete(auth, accessAdmin, controller.deleteProduct);

router.route("/product/search/:id").get(controller.ProductBySearch);
router.route("/product/category/:id").get(controller.ProductByCategory);
router.route("/categories").get(controller.Categories);

module.exports = router;
