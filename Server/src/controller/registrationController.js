const User = require('../models/user')

exports.userRegistration = async (req, res) => {
    try {
       const {name, email, userName, password} = req.body

       const existingUser = User.findOne({email});

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
 