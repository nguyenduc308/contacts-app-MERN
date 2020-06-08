const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const { ContactSchema } = require('./Contact')

const UserSchema = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    creatAt: {type: Date, default: new Date()},
    userType: {type: String, default: 'user'},
    contacts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Contact'}]
})

UserSchema.pre('save', function(next) {
    const user = this;
    if(!user.isModified('password')) return next()
    bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(user.password, salt))
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