const express = require('express');
const { userRegistration } = require('../controller/registrationController');
const { validateUser, validate } = require('../middleware/validator');
const router = express.Router();


router.post('/registration', validateUser, validate, userRegistration)
router.post('/login')

module.exports = router