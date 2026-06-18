const {authUser} = require('../middleware/auth');
const express = require('express');
const profileRouter = express.Router();
const validateEditProfileData = require('../utils/validation');
const bcrypt = require('bcrypt');


profileRouter.get('/profile/view', authUser, async (req, res) => {
    try {
        const loggedInUser = req.user;
        res.send(loggedInUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }

})

profileRouter.put('/profile/edit', authUser, async (req, res) => {
    try {
        if (!validateEditProfileData) {
            throw new Error("Invalid Edit request!")
        }

        const loggedInUser = req.user;
        Object.keys(req.body).forEach((key) => loggedInUser[key] = req.body[key]);

        await loggedInUser.save();

        res.json({ message: `${loggedInUser.firstName}, your profile updated successfully!!`, data: loggedInUser });
    } catch (err) {
        res.status(400).json("err.message");
    }

})

profileRouter.post('/profile/editpassword', authUser, async (req, res) => {
    try {

        const { password, editPassword, confirmEditPassword } = req.body;
        const loggedInUser = req.user;
        const isValidPassword = await bcrypt.compare(
            password,
            loggedInUser.password
        );
        if (!isValidPassword) {
            throw new Error("Current password is incorrect!!");
        }
        if (editPassword !== confirmEditPassword) {
            throw new Error("Password do not matched!")
        }

        const hashPassword = await bcrypt.hash(editPassword, 10);
        loggedInUser.password = hashPassword;

        loggedInUser.save();

        res.send("Password Updated successfully!!");

    } catch (err) {
        res.status(400).send("Something Went Wrong!!")
    }

})

module.exports = profileRouter;