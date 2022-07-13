const mongoose=require('mongoose')
require('dotenv').config()

async function init(){
    try{
       await mongoose.connect(process.env.MONGO_URI)
       console.log("Database is connected")
    }catch(err){
        console.log(err)
    }
}

module.exports=init