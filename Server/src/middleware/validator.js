const { check, validationResult } = require('express-validator');

exports.validateUser = [
    check("name")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Name is required")
        .isLength({ min: 3, max: 20 })
        .withMessage("Name must be 3 to 20 characters long"),

    check("email")
        .normalizeEmail()
        .isEmail()
        .withMessage("Email is invalid"),

    check("userName")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Username is required"),

    check("password")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Password is required")
        .isLength({ min: 8, max: 20 })
        .withMessage("password must be 8 to 20 characters long")
]


exports.validate = (req, res, next) => {
    const error = validationResult(req).array()

    if(!error.length){
        return next()
    }

    res.status(400).json({success: false, message: error[0].msg})
}