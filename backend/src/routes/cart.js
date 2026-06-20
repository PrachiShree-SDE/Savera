const express = require('express');
const cartRouter = express.Router();
const Cart = require('../models/cart');
const { authUser } = require('../middleware/auth');

cartRouter.post("/cart/add", authUser, async (req, res) => {
    try {
        const userId = req.user._id;
        const { productId } = req.body;

        if (!productId) {
            return res.status(400).json({ message: "ProductId is required" });
        }

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({
                userId,
                items: [{ productId, quantity: 1 }],
            });
        } else {
            const itemIndex = cart.items.findIndex(
                (item) =>
                    item.productId.toString() === productId.toString()
            );

            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += 1;
            } else {
                cart.items.push({ productId, quantity: 1 });
            }
        }

        await cart.save();

        res.json({
            success: true,
            message: "Added to cart",
            cart,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

cartRouter.get('/cart', authUser, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user._id }).populate('items.productId', "title price imageUrl brand category stock");
        let totalCost = 0;
        cart.items.forEach((item) => {
            totalCost += item.productId.price * item.quantity;
        });
        res.json({
            cart,
            totalCost,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

})

cartRouter.put('/cart/update', authUser, async (req, res) => {
    try {
        const { productId, action } = req.body;

        const allowedAction = ["increase", "decrease"];
        if (!allowedAction.includes(action)) {
            return res.status(400).json({
                message: "Action is not allowed!"
            });
        }
        const cart = await Cart.findOne({
            userId: req.user._id,
        });
        if (!cart) {
            return res.status(404).json({
                message: "Cart not found",
            });
        }
        const item = cart.items.find(
            (item) =>
                item.productId.toString() === productId.toString()
        );
        if (!item) {
            return res.status(404).json({
                message: "Product not found in cart",
            });
        }
        if (action === "increase") {
            item.quantity += 1;
        }
        if (action === "decrease") {
            item.quantity -= 1;
            // Remove item if quantity becomes 0
            if (item.quantity <= 0) {
                cart.items = cart.items.filter(
                    (item) =>
                        item.productId.toString() !== productId.toString()
                );
            }
        }
        await cart.save();
        res.json({
            success: true,
            message: "Cart updated successfully",
            cart,
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
})

cartRouter.delete("/cart/clear",authUser,async(req,res) => {
     try {
    const cart = await Cart.findOne({
      userId: req.user._id,
    }).select("userId items");
    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }
    cart.items = [];
    await cart.save();
    res.json({
      success: true,
      message: "Cart cleared successfully",
      cart,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
})


module.exports = cartRouter;