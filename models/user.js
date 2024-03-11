const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const secret = process.env.SECRET_KEY

const userSchema = new mongoose.Schema({
        username:{
            type:String,
            require:true
        },
        email:{
            type:String,
            require:true
        },
        password:{
            type:String,
            require:true
        },
        isAdmin:{
            type:Boolean,
            default:false
        }
        
})
userSchema.methods.generateToken = async function(){

    try {
        return jwt.sign({
            userId : this._id.toString(),
            email:this.email,
            isAdmin:this.isAdmin
        },secret,{
            expiresIn:"30d"
        })
    } catch (error) {
        console.log(error)
    }
}
const User = new mongoose.model("User",userSchema)

module.exports= User
