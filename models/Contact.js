const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String},
    phone: {type: String, required: true},
    facebook: {type: String},
    createAt: {type: Date, default: new Date()},
    own: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Contact = mongoose.model('Contact',ContactSchema, 'contacts')

module.exports = { Contact, ContactSchema }