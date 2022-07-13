const express=require('express')
const router=express.Router()
const product=require("../models/ProductModel")
const user=require("../models/UserModel")
const data=require("../Data/data")

router.get("/",async (req,res)=>{
       await product.remove({})
       const createdProducts=await product.insertMany(data.products)
       await user.remove({})
       const createUser=await user.insertMany(data.users)
       res.send({createdProducts,createUser})
})

module.exports=router