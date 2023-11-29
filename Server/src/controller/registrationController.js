const User = require('../models/user')
const jwt = require('jsonwebtoken')

// user registration
exports.userRegistration = async (req, res) => {
    try {
       const {name, email, userName, password} = req.body

       const existingUser = await User.findOne({email:email});

       if(existingUser){
         return res.status(400).json({
            success: false,
            message: "Email already exist"
         })
       }

       await new User({
         name,email,userName,password
       }).save();
 
       return res.status(200).json({
          success: true,
          message: 'Registration Successful'
       });
    }
    catch (error) {
       res.status(500).json({
          success: false,
          message: 'Something Went Wrong!'
       });
    }
 };
 

 // user login
 exports.login = async(req, res) => {
   try{
      const {email, password} = req.body;
      if(!email.trim() || !password.trim()){
         return res.status(401).json({
            success: false,
            message: 'Email/Password is required'
         })
      }

      const existingUser = await User.findOne({email});

      if(!existingUser){
         return res.status(401).json({
            success: false,
            message: "User not found"
         })
      }

      const isMatched = await existingUser.comparePassword(password);

      if(!isMatched){
         return res.status(401).json({
            success: false,
            message: "Email/Password does not matched"
         })
      }

      const token = jwt.sign({userId: existingUser._id}, process.env.JWT_SECRETKEY, {
         expiresIn: '7d'
      })

      return res.status(200).json({
         success: true,
         message: "Login success",
         user: existingUser,
         token: token
      })
      
   }
   catch(error){
      res.status(500).json({
         success: false,
         message: 'Something Went Wrong!'
   })
 }
}