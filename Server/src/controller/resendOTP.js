const VerificationToken = require('../models/verificationToken')
const { generateOTP } = require('../utilities/mail');
const { SendEmailUtility } = require('../utilities/mail')
const User = require('../models/user')


exports.resendOTP = async (req, res) => {
    const {userId }= req.body
    try{
         // find user into database by email
      const existingUser = await User.findOne({ _id: userId }); 

      if (!existingUser) {
         return res.status(400).json({
            success: false,
            message: "Invalid User"
         })
      }

      //get otp and save database
      const otp = generateOTP();
      const verificationToken = await new VerificationToken({
         owner: userId,
         token: otp
      })

      // user data save into database
      await verificationToken.save();

       // final response
       res.status(200).json({
        success: true,
        message: 'OTP sent your email. Please check your email',
        verificationToken
     });

      // OTP send into email
      let EmailText = "Your verification code is: " + `<span style="color:red">${otp}</span>`;
      await SendEmailUtility(existingUser.email, EmailText, "Email Verification");
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
           success: false,
           message: 'Something Went Wrong!',
           error: error
        });
     }

}