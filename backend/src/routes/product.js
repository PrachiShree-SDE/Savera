const express = require('express');
const productRouter = express.Router();
const Product = require('../models/product');
const { isAdmin, authUser } = require('../middleware/auth');

productRouter.post('/product/create',authUser,isAdmin,async(req, res) => {
    console.log("AUTH:", authUser);
console.log("ADMIN:", isAdmin);
    try{
         const {title,price, description,imageUrl,brand,category,stock} = req.body;
     const existingProduct = await Product.findOne({
        title
     })
     if(existingProduct){
        existingProduct.stock += stock;
        await existingProduct.save();
       return  res.status(201).json({
        message:"Stock Updated Successfully",
        data:existingProduct
       });
     }

     const newProduct = new Product({
        title,
        price,
        description,
        imageUrl,
        brand,
        category,
        stock,
        createdBy:req.user._id
     })

     await newProduct.save();

     res.status(200).json({message:"Product saved successfully",
        data:newProduct
     });
    }catch(err){
        res.status(400).json({message:err.message});
    }
})

module.exports = productRouter;