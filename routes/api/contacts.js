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

router.get('/:id',
    authenticate,
    authorized(["user", "admin"]),  
    getContactById)
router.post(
    '/',
    authenticate, 
    authorized(["user", "admin"]), 
    createContact);
router.get(
    '/',
    authenticate,
    authorized(["user", "admin"]),  
    getAllContacts);
router.delete(
    '/:id', 
    authenticate, 
    authorized(["user", "admin"]), 
    deleteContact);
router.patch(
    '/:id', 
    authenticate, 
    authorized(["user", "admin"]), 
    updateContact)


module.exports = router;
