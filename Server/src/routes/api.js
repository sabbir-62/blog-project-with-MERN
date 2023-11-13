const express = require('express');
const { userRegistration } = require('../controller/registrationController');
const router = express.Router();


router.post('/registration', userRegistration)
router.post('/login')

module.exports = router