const express = require('express')
const authRouter = express.Router();
const User = require('../models/users');


authRouter.post('/signup', async(req,res) => {
    try{
        const {firstName, lastName, emailId, password, role} = req.body;

    const existUser = User.findOne({
        emailId:emailId
    })
    if(existUser){
        throw new Error("Email exists Allready");
    }
        
    const user = new User({
        firstName,
        lastName,
        emailId,
        password,
        role
    })

   await user.save();

    res.send("User added successfully");
    } catch(err){
        res.status(400).send(err.message);
    }

})

module.exports = authRouter;
