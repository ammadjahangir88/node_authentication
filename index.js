const express=require('express');
require('dotenv').config();
require('./models/db')
const User= require('./models/user')
const app=express()
const userRouter=require('./routes/user')
const articleRouter=require('./routes/article')
const commentRouter=require('./routes/comment')
const cors = require('cors');


// app.use((req,resp,next)=>{

//     req.on('data',chunk=>{
//         console.log(JSON.parse(chunk));
//         req.data=JSON.parse(chunk);
//         next();
//     })

// })

// const test=async(email,password)=>{
//     const user= await User.findOne({email:email})
//     const result= await user.comparePassword(password)
//     console.log(result)
// }

// test("ammadjahangir88@gmail.com","090078601")

// Enable CORS for all routes
app.use(cors());
app.use('/uploads', express.static('uploads'));
app.use(express.json())

app.use(userRouter)
app.use(articleRouter)
app.use(commentRouter)
app.get('/',(req,resp)=>{
    resp.send("Hello World")

})
app.listen(8000,()=>{
    console.log("port is listening")
})