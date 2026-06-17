const jwt = require('jsonwebtoken');
const User = require('../models/users');

const authUser = async(req, res, next) => {
    const {token} = req.cookies;
    if(!token){
        throw new Error("Please login");
    }

    const decodeObj = jwt.verify(token,'Savara_secretKey');

    const {_id} = decodeObj;

    const user = await User.findById(_id)

    if(!user){
        throw new Error("User not Found!!");
    }

    req.user = user;
    next();
}

module.exports = authUser;