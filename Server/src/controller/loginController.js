const jwt = require('jsonwebtoken');
const User = require('../models/user')


/*----------user login----------*/
exports.login = async (req, res) => {
    try {
       const { email, password } = req.body; //object destructure

       if (!email.trim() || !password.trim()) {
          return res.status(401).json({
             success: false,
             message: 'Email/Password is required'
          })
       }
 
       const existingUser = await User.findOne({ email }); // find user into database by email
 
       if (!existingUser) {
          return res.status(401).json({
             success: false,
             message: "User not found"
          })
       }
 
       const isMatched = await existingUser.comparePassword(password); // password matching
 
       if (!isMatched) {
          return res.status(401).json({
             success: false,
             message: "Email/Password does not matched"
          })
       }
 
       //token generate
       const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRETKEY, {
          expiresIn: '7d'
       })
 
       return res.status(200).json({
          success: true,
          message: "Login success",
          user: existingUser,
          token
       })
 
    }
    catch (error) {
       res.status(500).json({
          success: false,
          message: 'Something Went Wrong!'
       })
    }
 }