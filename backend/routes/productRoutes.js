const express=require("express");
const router=express.Router();
const { protect, isAdmin } = require("../middlewares/authMiddleware");
const {
  createProduct,
  updateProduct,
  deleteProduct,
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


module.exports=router;