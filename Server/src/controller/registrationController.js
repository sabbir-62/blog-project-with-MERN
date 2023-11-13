const User = require('../models/user')

exports.userRegistration = async (req, res) => {
    try {
       const user = req.body
       const newUser = new User(user);
       await newUser.save();
 
       return res.status(200).json({
          success: true,
          message: 'Registration Successful'
       });
    } catch (error) {
       console.log(error);
       res.status(500).json({
          success: false,
          message: 'Registration Failed'
       });
    }
 };
 