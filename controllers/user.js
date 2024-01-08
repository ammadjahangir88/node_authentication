const jwt=require('jsonwebtoken')
const User=require('../models/user')
exports.createUser =async(req,resp)=>{
    const {fullName,email,password}=req.body
    const isNewUser= await User.isThisEmailInUse(email)
  
    if (!isNewUser) return resp.json({
      success: false,
      message: "This email is already in use try sign-in"
      })
    const user= await User({fullName,email,password})
    await user.save();
    resp.json(user)
      
}

exports.userSignIn = async (req, resp) =>{
  console.log(req.body) 
    const {email,password}=req.body
    console.log(email)
    const user=await User.findOne({email})

    if (!user) return resp.json({success: false, message:"User not found with the given Email"})

    const isMatch= await user.comparePassword(password)
    if (!isMatch) return resp.json({success: false,message:"Email/Password does not match!"})

    const token=jwt.sign({userId: user._id},process.env.JWT_SECRET,{expiresIn: '1d'})

    resp.json({success:true, user,token})
}

exports.userSignOut= async (req,res)=>{
  
  res.json({success: true, message: "Sign-out initiated. Please clear the token on the client side."});
}
