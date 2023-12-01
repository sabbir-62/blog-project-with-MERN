const resetPasswordToken = require("../models/resetPasswordToken");
const { SendEmailUtility } = require('../utilities/mail')
const User = require("../models/user");
const jwt = require('jsonwebtoken');
const { isValidObjectId } = require("mongoose");


/*----------forget password----------*/
exports.forgetPassword = async (req, res) => {
    try {
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
        const token = await resetPasswordToken.findOne({ owner: existingUser._id })
        if (token) {
            return res.status(400).json({
                success: false,
                message: "Please try after 1 hour"
            })
        }

        //token generate
        const newToken = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRETKEY)

        // save token into resetPasswordToken collection
        const resetToken = await new resetPasswordToken({
            owner: existingUser._id,
            token: newToken
        })
        await resetToken.save();

        const url = `http://localhost:3000/reset-password?token=${newToken}&id=${existingUser._id}`

        // OTP send into email
        let EmailText = `<a href=${url}><button style="background-color:#C0392B; color:white; font-size: 15px; padding:15px; border:none; border-radius:10px; cursor:pointer">Reset Password</button></a>`;
        await SendEmailUtility(email, EmailText, "Forget Password");

        // final success response
        return res.status(200).json({
            success: true,
            message: "Password reset link is sent to your email",
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




/*----------Reset Password----------*/
exports.resetPassword = async (req, res) => {
    try{
        // Object destructure
        const {token, id} = req.query;
        const {password} = req.body;
        if(!token || !id){
            return res.status(400).json({
                success: false,
                message: "Invalid request!"
            })
        }

        // Check user id
        if(!isValidObjectId(id)){
            return res.status(400).json({
                success: false,
                message: "Invalid User!"
            })
        }

        // find user from user collection by id
        const existingUser = await User.findById(id)
        if(!existingUser){
            return res.status(400).json({
                success: false,
                message: "User not found!"
            })
        }

        // find reset password token from resetPasswordToken collection
        const resetToken = await resetPasswordToken.findOne({owner:existingUser._id})
        if(!resetToken){
            return res.status(400).json({
                success: false,
                message: "Reset Token is not found!"
            })
        }

        // Token validation check
        const isValidToken = await resetToken.compareToken(token);
        if(!isValidToken){
            return res.status(400).json({
                success: false,
                message: "Reset Token is not valid!"
            })
        }

        // Compare between new and old password
        const isSamePassword = await existingUser.comparePassword(password)
        if(isSamePassword){
            return res.status(400).json({
                success: false,
                message: "New password must be different"
            })
        }

        // Check new password
        if(password.trim().length < 8 || password.trim().length > 20){
            return res.status(400).json({
                success: false,
                message: "Password must be 8 to 20 characters long"
            })
        }

        // reset new password
        existingUser.password = password;
        await existingUser.save();

        // delete token from resetPasswordToken collection
        await resetPasswordToken.findByIdAndDelete(resetToken._id)

        // success message send into email
        let EmailText = "Password reset successful"
        await SendEmailUtility(existingUser.email, EmailText, "Password Reset");


        // final success response
        return res.status(200).json({
            success: true,
            message: "Password reset successful",
            user: existingUser
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