const express = require('express');
const { userRegistration, login } = require('../controller/registrationController');
const { validateUser, validate } = require('../middleware/validator');
const router = express.Router();


router.post('/registration', validateUser, validate, userRegistration)
router.post('/login', login)

module.exports = router