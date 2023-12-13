const express = require('express');
const { userRegistration } = require('../controller/registrationController');
const { validateUser, validate } = require('../middleware/validator');
const { login } = require('../controller/loginController');
const { verifyEmail } = require('../controller/verifyEmailController');
const { forgetPassword, resetPassword } = require('../controller/resetPasswordController');
const { resendOTP } = require('../controller/resendOTP');
const { createBlog, readAllBlog, readBlogByCategory, blogDetails } = require('../controller/blogController/createBlog');
const { updateBlog } = require('../controller/blogController/updateBlog');

const router = express.Router();

router.post('/registration', validateUser, validate, userRegistration);
router.post('/login', login);
router.post('/verify-email', verifyEmail);
router.post('/forget-password', forgetPassword);
router.post('/reset-password', resetPassword);
router.post('/resend-otp', resendOTP);
router.post('/create-blog', createBlog);
router.get('/read-blog', readAllBlog);
router.post('/read-blog-by-category', readBlogByCategory)
router.post('/blog-details', blogDetails)
router.post('/update-blog', updateBlog)

module.exports = router;
