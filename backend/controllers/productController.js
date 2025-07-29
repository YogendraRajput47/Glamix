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

//filterAndSortProduct

exports.filterAndSortProduct = async (req, res) => {
  try {
    const {
      collection,
      size,
      color,
      gender,
      minPrice,
      maxPrice,
      sortBy,
      search,
      category,
      material,
      brand,
      limit,
    } = req.query;

    let query = {};

    //filter logic
    if (collection && collection.toLocaleLowerCase() != "all") {
      query.collections = collection;
    }
    if (category && category.toLocaleLowerCase() != "all") {
      query.category = category;
    }

    if (material) {
      query.material = { $in: material.split(",") };
    }
    if (brand) {
      query.brand = { $in: brand.split(",") };
    }
    if (size) {
      query.sizes = { $in: size.split(",") };
    }

    //  if(color){
    //    query.colors={$in:color.split(",")}
    //  }
    if (color) {
      query.colors = { $in: [color] };
    }

    if (gender) {
      query.gender = gender;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) {
        query.price.$gte = Number(minPrice);
      }
      if (maxPrice) {
        query.price.$lte = Number(maxPrice);
      }
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Sort Logic
    let sort = {};
    if (sortBy) {
      switch (sortBy) {
        case "priceAsc":
          sort = { price: 1 };
          break;
        case "priceDesc":
          sort = { price: -1 };
          break;
        case "popularity":
          sort = {
            rating: -1,
          };
          break;
        default:
          break;
      }
    }

    console.log("Query Parameters:", query);
    // find and apply sorting and limit
    let products = await Product.find(query)
      .sort(sort)
      .limit(Number(limit) || 0);

    res.status(200).json({
      success: true,
      message: "Products filered Successfully",
      products,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};

// getSingleProductDetails
exports.getSingleProductDetails = async (req, res) => {
  try {
    const productId = req.params.id;
    const productDetails = await Product.findById(productId);
    if (!productDetails) {
      return res.status(404).json({
        success: false,
        message: "Product Details not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product Details found Successfully",
      productDetails,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

//getSimilarProducts
exports.getSimilarProducts = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const similarProducts = await Product.find({
      _id: { $ne: id }, //Exclude the current product ID
      gender: product.gender,
      category: product.category,
    });

    res
      .status(200)
      .json({
        success: true,
        message: "Similar Products Found Successfully",
        similarProducts,
      })
      .limit(4);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

// getBestSellerProducts
exports.getBestSellerProducts = async (req, res) => {
  try {
    const bestSeller = await Product.findOne().sort({ rating: -1 });
    if (!bestSeller) {
      return res.status(404).json({
        success: false,
        message: "No best seller found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Best seller found Successfully",
      bestSeller,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
};

exports.getNewArrivedProducts = async (req, res) => {
  try {
    //fetch latest 8 Product
    const newArrivals = await Product.find().sort({ createdAt: -1 }).limit(8);
    return res.status(200).json({
      success: true,
      message: "New Arrived Products fetched Successfully",
      newArrivals,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
};
