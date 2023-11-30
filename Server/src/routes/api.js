const express = require('express');
const { userRegistration } = require('../controller/registrationController');
const { validateUser, validate } = require('../middleware/validator');
const { login } = require('../controller/loginController');
const { verifyEmail } = require('../controller/verifyEmail');
const router = express.Router();


router.post('/registration', validateUser, validate, userRegistration)
router.post('/login', login),
router.post('/verify-email', verifyEmail)

module.exports = router