const express = require('express');
const { userRegistration } = require('../controller/registrationController');
const { validateUser, validate } = require('../middleware/validator');
const { login } = require('../controller/loginController');
const { verifyEmail } = require('../controller/verifyEmailController');
const { forgetPassword } = require('../controller/forgetPasswordController');
const router = express.Router();


router.post('/registration', validateUser, validate, userRegistration)
router.post('/login', login),
router.post('/verify-email', verifyEmail)
router.post('/reset-password', forgetPassword)

module.exports = router