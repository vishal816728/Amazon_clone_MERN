const express=require('express')
const app=express()
const data=require('./Data/data')
const cors=require('cors')
const DBinit=require('./config/db')
const seedrouter=require('./routes/SeedRoute')
const productRoute=require("./routes/ProductRoute")
const userRouter = require('./routes/UserRoute')
const Razorpay=require('razorpay')
const mongoose=require('mongoose')

const PORT=process.env.PORT || 5000

DBinit()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.json({ extended: false }));
app.use("/api/seed",seedrouter)
app.use("/api/products",productRoute)

//******************************************Razorpay****************************************************** */

const OrderSchema=mongoose.Schema({
    isPaid:Boolean,
    amount:Number,
    razorpay:{
        orderId:String,
        paymentId:String,
        signature:String
    }
})
const Order=mongoose.model("Order",OrderSchema)

app.get("/get-razorpay-key",(req,res)=>{
        res.send({key:process.env.RAZORPAY_KEY_ID})
})

app.post("/create-order",async (req,res)=>{
     try{
         const instance=new Razorpay({
             key_id:process.env.RAZORPAY_KEY_ID,
             key_secret:process.env.RAZORPAY_SECRET
         })
         const options={
             amount:req.body.amount,
             currency:'INR'
         }
         const order=await instance.orders.create(options)
         if(!order){
             return res.status(500).send('some error occured')
         }else{
             res.send(order)
         }

     }catch(err){
        res.status(500).send(err)
     }
})
 app.post("/pay-order",async(req,res)=>{
     try{
         const {amount,razorpayPaymentId,razorpayOrderId,razorpaySignature}=req.body
         const newOrder = Order({
            isPaid: true,
            amount: amount,
            razorpay: {
              orderId: razorpayOrderId,
              paymentId: razorpayPaymentId,
              signature: razorpaySignature,
            },
          });
          await newOrder.save()
          res.send({msg:'payment was successfull'})
     }catch(err){
           console.log(err)
           res.status(500).send(err)
     }
 })
//******************************************Razorpay****************************************************** */

// if there is an error in expressAsyncHandler this middleware will be triggered
app.use((err,req,res,next)=>{
    res.status(500).send({message:err.message})
})
app.use('/api/user',userRouter)

app.listen(PORT,()=>{
    console.log(`port is listening on ${PORT}`)
})