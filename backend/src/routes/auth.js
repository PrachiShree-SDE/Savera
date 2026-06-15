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

authRouter.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;

        const user = await User.findOne({ emailId });

        if (!user) {
            return res.status(404).send("User not found");
        }

        if (user.password !== password) {
            return res.status(400).send("Invalid Credentials");
        }

        res.send(user);

    } catch (err) {
        res.status(400).send(err.message);
    }
});

module.exports = authRouter;
