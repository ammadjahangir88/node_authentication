const {check,validationResult}=require("express-validator")


exports.validateUserSignUp=[
    check('fullName').trim().not().isEmpty().isLength({min: 3, max: 20})
    .withMessage('Name Must be within 3 to 20 characters'),
    check('email').normalizeEmail().isEmail().withMessage('Invalid Email'),
    check('password').trim().not().isEmpty()
    .withMessage("Password is EMpty")
    .isLength({min: 8, max: 20})
    .withMessage('Password Must be  3 to 20 characters long '),
    check('confirmPassword').trim().not().isEmpty().custom((value,{req})=>{

        if (value !== req.body.password)
        {
            throw new Error("Both password must be same!")
        }
        return true;

    })
]

exports.userVlidation = (req, res, next) => {
    console.log("Hello World")
    const result = validationResult(req).array();
    console.log('Validation Result:', result);
  
    if (!result.length) return next();
  
    const error = result[0].msg;
    res.json({ success: false, message: error });
}
exports.validateUserSignIn=[
    check('email').trim().isEmail().withMessage("email/password is required")
    ,
    check("password").trim().not().isEmpty().withMessage('Email/Password is required ')
]
