const { isValidObjectId } = require("mongoose");
const User = require('../models/user')
const VerificationToken = require('../models/verificationToken')
const {SendEmailUtility} = require('../utilities/mail')


/*----------Email verification----------*/
exports.verifyEmail = async (req, res) => {
    const {userId, otp} = req.body; // object destructure

    // empty field checking for user id and otp
    if(!userId || !otp.trim()){
        return res.status(400).json({
            success: false,
            message: "Invalid request"
        })
    }

    // checking user id validation
    if(!isValidObjectId(userId)){
        return res.status(400).json({
            success: false,
            message: "Invalid userId"
        })
    }

    // find user by user id
    const existingUser = await User.findById(userId);


    if(!existingUser){
        return res.status(400).json({
            success: false,
            message: "User not found"
        })
    }

    // checking user verification
    if(existingUser.verified){
        return res.status(400).json({
            success: false,
            message: "This account is already verified"
        })
    }

    // find user from verificationToken collection
    const token = await VerificationToken.findOne({owner: userId}) 

    if(!token){
        return res.status(400).json({
            success: false,
            message: "User not found"
        })
    }

    // compare between email otp and verificationToken collection hashed otp
    const isMatched = await token.compareToken(otp)

    if(!isMatched){
        return res.status(400).json({
            success: false,
            message: "Please provide valid otp"
        })
    }

    // verified status change
    existingUser.verified = true;

    // delete unverified user otp information from verificationToken collection
    await VerificationToken.findByIdAndDelete(token._id);

    // update and save user verified status
    await existingUser.save();

    // Verification status send into email
    let EmailText = "Congratulations. Your account has been verified";
    await SendEmailUtility(existingUser.email, EmailText, "Email Verification");
    
    // success response
    return res.status(200).json({
        success: true,
        message: 'User verification successful'
     });

}