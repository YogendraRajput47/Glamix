const mongoose=require("mongoose");
const bcrypt=require("bcrypt");

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        match:[/.+\@.+\..+/,"Please enter the valid email address"]
    },
    password:{
        type:String,
        required:true,
        minLength:6,
    },
    role:{
        type:String,
        enum:["customer","admin"],
        default:"customer"
    }
},
{timestamps:true}
);

userSchema.pre("save",async function (next) {
    if(!this.isModified) return next();
    const saltRounds=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,saltRounds);
    next();  
});

//match user entered password to hashed password
userSchema.methods.matchPassword=async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password)
}

const User=mongoose.model("User",userSchema);
module.exports=User;