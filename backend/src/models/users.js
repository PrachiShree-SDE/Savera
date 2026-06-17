const mongoose = require('mongoose');
const  validator = require('validator');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        minLength: 4,
        maxLength:15,
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email Address!!")
            }
        }

    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Please Enter the Strong Password");
            }
        }
    },
   role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
},
},
{
    timestamps:true,
})


userSchema.methods.getJWT = function (){
    const user = this;
    const token = jwt.sign({_id:user._id},'Savara_secretKey',{expiresIn:'7d'});
    return token;
}

module.exports = mongoose.model("User",userSchema);