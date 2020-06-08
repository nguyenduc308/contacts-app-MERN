const jwt = require('jsonwebtoken')
const {User} = require('../models/User')
module.exports.authenticate = async (req, res, next) => {
    const { token } = req.headers;
    if(!token) return res.status(400).json({error: "Auth required"})
    try {
        const decoded = await jwt.verify(token, "ABC!242421424")
        if(!decoded) {
            return res.status(400).json({error: "Auth required"})
        } else {
            req.user = decoded;
            return next()
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: "Server error"})
    }
}
module.exports.authorized = (userTypeArr) => async (req, res, next) => {
    console.log(req.user)
    const { id } = req.user;
    const user = await User.findById(id);
    const i = userTypeArr.findIndex(type => user.userType === type);
    if(i === -1) {
        return res.status(400).json({error: "Auth requried"})
    } else {
        return next();
    }
}
