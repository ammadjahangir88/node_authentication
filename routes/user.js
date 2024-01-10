const express=require('express');
const {createUser,userSignIn,userSignOut}=require('../controllers/user')
const router=express.Router();
const {isAuth}=require('../middlewares/auth')
const { validateUserSignUp, userVlidation, validateUserSignIn } = require('../middlewares/validation/user');
const jwt=require('jsonwebtoken')
const User=require('../models/user')
router.post('/create-user', validateUserSignUp,userVlidation, createUser);
router.post('/sign-in', userSignIn);
router.get('/sign-out', userSignOut);


module.exports=router;


