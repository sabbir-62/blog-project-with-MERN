// Import requirements
const User = require('../models/user')
const VerificationToken = require('../models/verificationToken')
const { generateOTP } = require('../utilities/mail');
const {SendEmailUtility} = require('../utilities/mail')



/*----------user registration----------*/
exports.userRegistration = async (req, res) => {
   try {
      const { name, email, userName, password } = req.body //object destructure

      const existingUser = await User.findOne({ email: email }); // find user into database by email
      if (existingUser) {
         return res.status(400).json({
            success: false,
            message: "Email already exist"
         })
      }

      // create new user
      const newUser = new User({
         name, email, userName, password
      })

      //get otp and save database
      const otp = generateOTP();
      const verificationToken = new VerificationToken({
         owner: newUser._id,
         token: otp
      })

      // OTP send into email
      let EmailText = "Your verification code is " + otp;
      await SendEmailUtility(email, EmailText, "Email Verification");

      // user data save into database
      await verificationToken.save();
      await newUser.save();

      return res.status(200).json({
         success: true,
         message: 'Registration Successful'
      });
   }
   catch (error) {
      console.log(error)
      res.status(500).json({
         success: false,
         message: 'Something Went Wrong!',
         error: error
      });
   }
};