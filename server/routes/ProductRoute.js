const express=require('express')
const model=require("../models/ProductModel")
const ProductRouter=express.Router()

ProductRouter.get("/",async (req,res)=>{
    try{
    const product=await model.find({})
    res.send(product)
    }catch(err){
        console.log(err)
    }
})

ProductRouter.get("/slug/:slug",async (req,res)=>{
    const product=await model.findOne({slug:req.params.slug})
    if(product){
        res.send(product)
    }else{
        res.status(404).send("Item does not exist")
    }
})

ProductRouter.get("/:id",async (req,res)=>{
   const product=await model.findById(req.params.id)
   if(product){
       res.send(product)
   }else{
       res.status(404).send("Item does not exist")
   }
})
module.exports=ProductRouter