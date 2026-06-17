const express = require('express');
const authUser = require('../middleware/auth');
const adminRouter = express.Router();
const User = require('../models/users');


adminRouter.get('/admin/users',authUser,async(req, res) => {
  try{
       const loggedInUser = req.user;
    if(loggedInUser.role !== 'admin'){
        return res.status(403).json({message:"Only admin can see all the user!!"})
    }
    
    const users = await User.find({
       _id:{$ne: loggedInUser._id}
    }).select("firstName lastName emailId role");

    if(users.length === 0){
       return  res.status(200).send({message: "Theres no user left"})
    }

    res.json({data: users});
  }catch(err){
    res.status(400).json({message:err.message});
  }
})

module.exports = adminRouter;