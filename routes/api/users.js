const express = require('express');
const router = express.Router();
const { signUp, signIn, getUserAuth } = require('../../controllers/users')
const { authenticate } = require('../../middlewares/auth')
router.post('/register', signUp)
router.post('/login', signIn)
router.get('/auth',authenticate, getUserAuth)
module.exports = router;

