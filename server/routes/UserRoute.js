const express=require('express')
const bcrypt=require("bcrypt")
const userRouter=express.Router()
const userModel=require("../models/UserModel")
const generateToken = require('../utils')
const expressAsyncHandler=require('express-async-handler')

userRouter.post('/signin',expressAsyncHandler(async (req,res)=>{
    const user=await userModel.findOne({email:req.body.email})
    if(user){
        if(bcrypt.compareSync(req.body.password,user.password)){
            res.send({
                _id:user._id,
                name:user.name,
                email:user.email,
                isAdmin:user.isAdmin,
                token:generateToken(user)
            })
            return
        }
    }
    // res.status(401).send({message:"Invalid username or password"})
}))

userRouter.post("/signup",expressAsyncHandler(async (req,res)=>{
      const newUser=new userModel({
          name:req.body.name,
          email:req.body.email,
          password:bcrypt.hashSync(req.body.password,10)
      })
      const user=await newUser.save()
      res.send({
        _id:user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin,
        token:generateToken(user)
    })
}))

module.exports=userRouter