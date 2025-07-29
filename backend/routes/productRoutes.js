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
  getBestSellerProducts,
  getNewArrivedProducts,
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


//@route Get /api/products/best-seller
//@ Retrieve the product with highest rating
//@ Access Public
router.get("/best-seller",getBestSellerProducts)


//@route Get /api/products/new-arrivals
//@ Retrieve the latest 8 products -Creation date
//@ Access Public
router.get("/new-arrivals",getNewArrivedProducts)


//@route Get /api/products/:id
//@ Get a single Product Details by its ID
//@ Access Public
router.get("/:id",getSingleProductDetails)

//@route Get /api/products/similar/:id
//@ Retrieve Similar Product based on the current product's gender and category
//@ Access Public

router.get("/similar/:id",getSimilarProducts)




module.exports=router;