const User=require("../models/User");
exports.getLoggedInUser=async (req,res)=>{
    try{
        res.status(200).json(req.user);

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong",
            error:error.message
        });
    }
}