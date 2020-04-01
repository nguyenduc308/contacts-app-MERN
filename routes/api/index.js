const express = require('express');
const router = express.Router()

router.use('/contacts', require('./contacts'));
router.use('/u', require('./users'))
module.exports = router;