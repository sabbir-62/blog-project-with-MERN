const User = require('../models/user')

exports.userRegistration = async (req, res) => {
    try {
       const {name, email, userName, password} = req.body

       await new User({
         name,email,userName,password
       }).save();
 
       return res.status(200).json({
          success: true,
          message: 'Registration Successful'
       });
    }
    catch (error) {
       console.log(error);
       res.status(500).json({
          success: false,
          message: 'Registration Failed'
       });
    }
 };
 