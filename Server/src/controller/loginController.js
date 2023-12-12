const jwt = require('jsonwebtoken');
//const loginUser = require('../models/loginUser');
const User = require('../models/user')
const VerificationToken = require('../models/verificationToken')
const { generateOTP } = require('../utilities/mail');
const { SendEmailUtility } = require('../utilities/mail')


/*----------user login----------*/
exports.login = async (req, res) => {
   try {
      const { email, password } = req.body; //object destructure

      if (!email || !password) {
         return res.status(401).json({
            success: false,
            message: 'Email/Password is required'
         })
      }

      // find user into database by email
      const existingUser = await User.findOne({ email });
      // const existingLoginUser = await loginUser.findOne({ email })

      if (!existingUser) {
         return res.status(401).json({
            success: false,
            message: "User not found"
         })
      }

      // if (existingLoginUser) {
      //    return res.status(400).json({
      //       success: false,
      //       message: "User already logged in"
      //    })
      // }

      const isMatched = await existingUser.comparePassword(password); // password matching

      if (!isMatched) {
         return res.status(401).json({
            success: false,
            message: "Email/Password does not matched"
         })
      }

      if (!existingUser.verified) {
         //get otp and save database
         const otp = generateOTP();
         const verificationToken = await new VerificationToken({
            owner: existingUser._id,
            token: otp
         })
         // user data save into database
         await verificationToken.save();
         // final response
         res.status(200).json({
            message: 'Your account is not verified. Please check your email',
            user: existingUser
         });

         // OTP send into email
         let EmailText = "Your verification code is: " + `<span style="color:red">${otp}</span>`;
         await SendEmailUtility(email, EmailText, "Email Verification");
      }

      else {
         //token generate
         const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRETKEY)

         // save login user into loginUser collection
         // const newLoginUser = await new loginUser({
         //    owner: existingUser._id,
         //    email,
         //    password,
         //    token
         // })
         // await newLoginUser.save();


         return res.status(200).json({
            success: true,
            message: "Login success",
            user: existingUser,
            token
         })
      }

   }
   catch (error) {
      res.status(500).json({
         success: false,
         message: 'Something Went Wrong!'
      })
   }
}