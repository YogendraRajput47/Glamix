const express=require("express");
const router=express.Router();
const { protect, isAdmin } = require("../middlewares/authMiddleware");
const {
  createProduct,
  updateProduct,
  deleteProduct,
  filterAndSortProduct,
  getSingleProductDetails,
  getSimilarProducts,
} = require("../controllers/productController");





//@route Post /api/products
//@ Create a new Product
//@ Access Private/Admin
router.post("/",protect,isAdmin,createProduct);

//@route PUT /api/products/:id
//@ Update the existing product by its ID
//@ Access Private/Admin
router.put("/:id",protect,isAdmin,updateProduct);

//@route DELETE /api/products/:id
//@ Delete the existing product by its ID
//@ Access Private/Admin
router.delete("/:id",protect,isAdmin,deleteProduct);


//@route Get /api/products
//@ Get all products with optional query filter
//@ Access Public
router.get("/", filterAndSortProduct);

//@route Get /api/products/:id
//@ Get a single Product Details by its ID
//@ Access Public
router.get("/:id",getSingleProductDetails)

//@route Get /api/products/similar/:id
//@ Retrieve Similar Product based on the current product's gender and category
//@ Access Public

router.get("/similar/:id",getSimilarProducts)


module.exports=router;