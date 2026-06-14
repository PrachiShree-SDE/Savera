const mongoose = require('mongoose');
const  validator = require('validator');

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
}

)

module.exports = mongoose.model("User",userSchema);