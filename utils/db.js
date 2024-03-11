const mongoose = require("mongoose")
const uri =  process.env.MONGODB_URI

 

const main= async()=>{
    try {
        await mongoose.connect(uri)
        
        console.log("success")
    } catch (error) {
        console.log(error)
    }

}
module.exports = main