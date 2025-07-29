const Product = require("../models/Product");

//createProduct

exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
    } = req.body;

    const product = new Product({
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
      user: req.user._id, //Reference to the admin user who created it
    });
    const createdProduct = await product.save();
    res.status(201).json({
      success: true,
      message: "Product Created Successfully",
      createdProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error", error);
  }
};

//updateProduct
exports.updateProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
    } = req.body;

    //Finding the product by ID
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (product) {
      //update product fields
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.discountPrice = discountPrice || product.discountPrice;
      product.countInStock = countInStock || product.countInStock;
      product.category = category || product.category;
      product.brand = brand || product.brand;
      product.sizes = sizes || product.sizes;
      product.colors = colors || product.colors;
      product.collections = collections || product.collections;
      product.material = material || product.material;
      product.gender = gender || product.gender;
      product.images = images || product.images;
      product.isFeatured =
        isFeatured !== undefined ? isFeatured : product.isFeatured;
      product.isPublished =
        isPublished !== undefined ? isPublished : product.isPublished;
      product.tags = tags || product.tags;
      product.dimensions = dimensions || product.dimensions;
      product.weight = weight || product.weight;
      product.sku = sku || product.sku;
    }

    //save the updated Product
    const updatedProduct = await product.save();
    res.status(200).json({
      success: true,
      message: "Product Updated Successfully",
      updatedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error", error);
  }
};

//deleteProduct
exports.deleteProduct = async (req, res) => {
  try {
    //find the product by its ID
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      //Remove the product from database
      await product.deleteOne();
      res.status(200).json({
        success: true,
        message: "Product removed Succcessfully",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};


exports.sortProducts=async(req,res)=>{
  try{

  }catch(error){
      console.error(error);
      return res.status(500).send("Server Error");
  }
}