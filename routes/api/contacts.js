const express = require('express');
const router = express.Router()
const {
    getContactById,
    updateContact,
    deleteContact,
    createContact,
    getAllContacts,
} = require('../../controllers/contacts')

const { authenticate, authorized } = require('../../middlewares/auth')

router.get('/:id', getContactById)
router.post(
    '/',
    authenticate, 
    authorized(["admin", "author"]), 
    createContact);
router.get('/', getAllContacts);
router.delete(
    '/:id', 
    authenticate, 
    authorized(["admin", "author"]), 
    deleteContact);
router.patch(
    '/:id', 
    authenticate, 
    authorized(["admin", "author"]), 
    updateContact)


module.exports = router;
