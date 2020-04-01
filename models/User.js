const mongoose = require('mongoose');
const bscypt = require('bcrypt')
//UserType: Anonymos, user, author, admin

const UserSchema = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    creatAt: {type: Date, default: new Date()},
    userType: {type: String, default: 'user'},
})

UserSchema.pre('save', function(next) {
    const user = this;
    if(!user.isModified('password')) return next()
    bscypt
        .genSalt(10)
        .then(salt => bscypt.hash(user.password, salt))
        .then(hash => {
            user.password = hash;
            return next();
        })
        .catch(err => {
            throw err;
        })
})

const User = mongoose.model('User',UserSchema, 'users')

module.exports = { User }