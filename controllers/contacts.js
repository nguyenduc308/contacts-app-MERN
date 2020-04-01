const { Contact } = require('../models/Contact')

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
        const contacts = await Contact
                            .find()
                            .sort({createAt: -1})
                            .limit(limit)
                            .skip(limit*(page-1))

        res.status(200).json({
            msg: "success",
            data: contacts
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
    } = req.body
    const data = {
        name,
        email,
        phone,
        facebook
    }
    try {
        const newContact = new Contact(data);
        await newContact.save()
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
    try {
        const contact = await Contact.findById(id);
        if(!contact) return res.status(404).json({eror: "Contact not found"});
        await contact.deleteOne({_id: id});
        return res.status(204);
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: "Server error"})
    }
}
module.exports.updateContact = async (req, res) => {
    const { id } = req.param;
    try {
        const contact = await Contact.findById(id);
        if(!contact) return res.status(404).json({error: "contact not found"});
        Object.keys.forEach(key => contact[key] = req.body[key]);
        await contact.save();
        res.status(200).json({msg: "Success", data: contact})
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: "Server error"})
    }
}
