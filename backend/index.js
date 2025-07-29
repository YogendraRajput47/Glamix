const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const connectToDB=require("./config/database");
const userRoutes=require("./routes/userRoutes");
const productRoutes=require("./routes/productRoutes");

app.use(express.json());
app.use(cors());

dotenv.config();  

const PORT = process.env.PORT || 8080;

//Connect To MongoDB
connectToDB();

app.get("/", (req, res) => {
  res.send("Welcome to GLAMIX API");
});

//API Routes
app.use("/api/users",userRoutes);
app.use("/api/products",productRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`)
});
