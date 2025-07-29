const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("../models/Product");
const User = require("../models/User");
const products = require("../data/products");
dotenv.config();

//connect to mongoDB database
mongoose.connect(process.env.MONGO_URL);

//function to seed the DATA

const seedData = async () => {
  try {
    //clear existing data
    await Product.deleteMany();
    await User.deleteMany();

    //Create a default admin user
    const createdUser = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: "123456",
      role: "admin",
    });

    // Assign the default userId to each product
    const userId = createdUser._id;

    const sampleProduct = products.map((product) => {
      return { ...product, user: userId };
    });

    //Insert the products into the database
    await Product.insertMany(sampleProduct);

    console.log("Product data seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("Seeding the data", error);

    process.exit(1);
  }
};

seedData();
