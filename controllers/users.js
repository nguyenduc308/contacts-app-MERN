const jwt = require('jsonwebtoken');
const bscrypt = require('bcrypt')
const { User } = require('../models/User')
const { validatorSignUp, validatorLogin } = require('../middlewares/users.validator');

//@Post a user
exports.signUp = async (req, res) => {
    const { valid, errors } = validatorSignUp(req.body)
    if(!valid) return res.status(400).json({
        error: errors
    })
    const { email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if(user) res.status(400).json({error: "Email has been taken! Please use other email"})
        const newUser = new User({email, password})
        await newUser.save()
        const payload = {id:newUser._id,email};
        jwt.sign(
            payload,
            "ABC!242421424",
            {expiresIn: 360000},
            (error, token)=> {
                if(error) throw error
                res.status(200).json({msg: "Success", token})
            }
            )
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: "Server error"})
    }
}

exports.signIn = async (req, res) => {
    const { valid, errors } = validatorLogin(req.body)
    if(!valid) return res.status(400).json({
        error: errors
    })
    const { email, password} = req.body;
    try {
        const user = await User.findOne({email})
        if(!user) return res.status(400).json({error: "Login fail"})
        const isMatch = bscrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({error: "Login fail"})
        const payload = {id: user._id,email};
        jwt.sign(
            payload,
            "ABC!242421424",
            {expiresIn: 360000},
            (error, token)=> {
                if(error) throw error
                res.status(200).json({msg: "Success", token})
            }
            )
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Server error"})
    }
}
module.exports.getUserAuth =  async (req, res) => {
    try {
        const user = await await User.findById(req.user.id).select('-password');
        res.json(user);

    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Server error"})
    }
}