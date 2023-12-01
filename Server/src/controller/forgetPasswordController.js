const resetPasswordToken = require("../models/resetPasswordToken");
const User = require("../models/user");
const jwt = require('jsonwebtoken');


/*----------forget password and set new password----------*/
exports.forgetPassword = async (req, res) => {
   try{
     //object destructure
     const { email } = req.body;
     if (!email) {
         return res.status(400).json({
             success: false,
             message: "Please provide a valid email"
         })
     }
 
     // find user from user collection by email
     const existingUser = await User.findOne({ email });
     if (!existingUser) {
         return res.status(400).json({
             success: false,
             message: "User not found, invalid request!"
         })
     }
 
     // find token from resetPasswordToken collection
     const token = await resetPasswordToken.findOne({owner: existingUser._id})
     if(token){
         return res.status(400).json({
             success: false,
             message: "Please try after 1 hour"
         })
     }
 
     //token generate
     const newToken = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRETKEY, {
         expiresIn: '7d'
      })
 
     return res.status(200).json({
         user: existingUser,
         token: newToken
     })
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