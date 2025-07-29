const express=require("express");
const router=express.Router();


const {registerUser,userLogin}=require("../controllers/authController");
const {getLoggedInUser}=require("../controllers/userProfileController");
const {protect}=require("../middlewares/authMiddleware");


//@route POST /api/users/register
//@Register new user
//@Access Public

router.post("/register",registerUser);

//@route POST /api/users/login
//@Authenticate new user
//@Access Public

router.post("/login",userLogin)



//@route POST /api/users/profile
//@Authenticate new user
//@Access Private
router.get("/profile",protect,getLoggedInUser);



module.exports=router;



