const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//register

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    user = new User({ name, email, password });
    await user.save();

    //create JWT Payload
    const payload = { user: { id: user._id, role: user.role } };

    //Sign and return the token along with user data
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "40h" },
      (err, token) => {
        if (err) throw err;

        //send the user and token in response
        res.status(201).json({
          success: true,
          message: "User registered Successfully",
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

//userLogin
exports.userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    //find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const isMatch =await user.matchPassword(password);
    console.log(isMatch);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    //Create JWT payload
    const payload = { user: { id: user._id, role: user.role } };

    //Sign and return the token with the user payload
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "40h" },
      (err, token) => {
        if (err) throw err;

        //Send the user and token in response
        res.json({
          success: true,
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};
