const express = require("express");
const { verifyUser } = require("../middlewares/verifyUser");
const { addProduct, getAllProduct } = require("../controllers/productController");

const router = express.Router();

router.post("/addProduct", verifyUser, addProduct);
router.get("/products", getAllProduct);

module.exports = router;
