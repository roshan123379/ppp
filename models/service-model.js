const mongoose = require("mongoose")

const serviceSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    }
})

const serviceModel = new mongoose.model("item",serviceSchema)

module.exports = serviceModel