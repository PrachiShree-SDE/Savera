const express = require('express')
const authRouter = express.Router();
const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


authRouter.post('/signup', async(req,res) => {
    try{
        const {firstName, lastName, emailId, password, role} = req.body;
    
        const hashPassword = await bcrypt.hash(password,10);

    const existUser = await User.findOne({
        emailId:emailId
    })
    if(existUser){
        throw new Error("Email exists Allready");
    }
        
    const user = new User({
        firstName,
        lastName,
        emailId,
        password:hashPassword,
        role
    })

  const savedUser = await user.save();
    
    const token = savedUser.getJWT()

   res.cookie("token",token,{
    //expires: new Date(Date.now() + 8*3600000)
     maxAge: 7 * 24 * 60 * 60 * 1000 
   })

    res.send("User added successfully");
    } catch(err){
        res.status(400).send(err.message);
    }

})


authRouter.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;

        const user = await User.findOne({ emailId });

        if (!user) {
            return res.status(404).send("User not found");
        }

         const isValid = await bcrypt.compare(
            password,
             user.password
        )

        if(!isValid){
            throw new Error("Invalid Credentials!")
        }

        const token = user.getJWT();

        res.cookie('token',token,{
             maxAge: 7 * 24 * 60 * 60 * 1000 
        })

        res.send(user);

    } catch (err) {
        res.status(400).send(err.message);
    }
});


// authRouter.post("/logout", (req, res) => {
//     res.clearCookie("token");
//     res.send("Logged out successfully");
// });

authRouter.post("/logout", (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now())
    });

    res.send("Logged out successfully");
});

module.exports = authRouter;
