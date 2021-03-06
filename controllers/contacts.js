const { Contact } = require('../models/Contact');
const { User } = require('../models/User');

module.exports.getAllContacts =  async (req, res) => {
    let { limit, page } = req.query;
    if(!limit) {
        limit = 10;
    } else {
        limit = +limit
    }
    if(!page) {
        page = 1;
    } else {
        page = +page
    }
    try {
        const user = await User
                            .findById(req.user.id)
                            .populate('contacts')
                            .sort({createAt: -1})
                            .limit(limit)
                            .skip(limit*(page-1))

        res.status(200).json({
            msg: "success",
            data: user.contacts
        })
    } catch (error) {
        res.status(500).json({
            error: "Server error"
        })
    }
}
module.exports.getContactById =  async (req, res) => {
    const { id } = req.params;
    try {
        const contact = await Contact.findById(id)
        if(!contact) res.status(400).json({error: "contact not found"})
        res.status(200).json({
            msg: "success",
            data: contact
        })
    } catch (error) {
        res.status(500).json({
            error: "Server error"
        })
    }
}
module.exports.createContact = async (req,res) => {
    const {
        name,
        email,
        phone,
        facebook
    } = req.body;
    const { id } = req.user;
    const data = {
        name,
        email,
        phone,
        facebook,
        own: id
    }
    try {
        const newContact = new Contact(data);
        const user = await User.findById(id);
        user.contacts.push(newContact._id);
        await user.save();
        await newContact.save();
        res.status(201).json({
            msg: "success",
            data: newContact
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Server error"
        })
    }
}
module.exports.deleteContact = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    try {
        const contact = await Contact.findById(id);
        if(!contact) return res.status(404).json({error: "Contact not found"});

        const user = await User.findById(userId);
        user.contacts.filter(contactId => contactId !== id);
        await user.save();
        await contact.deleteOne({_id: id});
        return res.status(200).json({msg: "Delete success"});
    } catch (error) {
        console.error(error);   
        return res.status(500).json({error: "Server error"})
    }
}
module.exports.updateContact = async (req, res) => {
    nmj
    const { id } = req.params;
    try {
        const contact = await Contact.findById(id);
        if(!contact) return res.status(404).json({error: "contact not found"});
        Object.keys(req.body).forEach(key => contact[key] = req.body[key]);
        const _contact = await contact.save();
        res.status(200).json({msg: "Success", data: _contact})
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: "Server error"})
    }
}
