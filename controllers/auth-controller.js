const User = require("../models/user")
const Contact = require("../models/contact-model")
const bcrypt = require("bcryptjs")
const serviceModel = require("../models/service-model")

const home = async (req, res) => {
    try {
        res.status(200).send("home")
    } catch (error) {
        console.log(error)
    }
}

const register = async (req, res,next) => {
    try {
        const { username, password, email } = req.body

        const userExit = await User.findOne({ email })
        if (userExit) {
            res.status(400).json({ msg: "user exist" })
        }
        const salt = 10
        const hassPassword = await bcrypt.hash(password, salt)
        const userCreate = await User.create({ username, password: hassPassword, email })
        if (userCreate) {
            res.status(200).json({ msg: " register successful", Token: await userCreate.generateToken(), userId: userCreate._id.toString() })
        }


    } catch (error) {
      
        next(error)
    }


}

const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const userExist = await User.findOne({ email })
        if (!userExist) {
            res.status(400).json({ msg: "invalid details" })
        }

        const user = await bcrypt.compare(password, userExist.password)
        if (user) {
            res.status(200).json({ msg: " login successful", Token: await userExist.generateToken(), userId: userExist._id.toString() })
        }
        else {
            res.status(400).json({ msg: "invalid details and password" })
        }
    } catch (error) {
        res.status(500).json("login error")
        next()
    }
}

const contact = async (req, res) => {
    try {
        const { username, email, message } = req.body

        await Contact.create({ username, email, message })

        return res.status(200).json({ msg: "contact submitted" })


    } catch (error) {
        return res.status(400).json({ msg: "not contact submitted" })

    }
}

const userData = async(req,res)=>{
    try {
        const userData =  req.user
        console.log(userData)
        res.status(200).send({userData})
    } catch (error) {
       res.status(400).send({"msg":"error"})
    }
}

const service = async(req,res)=>{
    try {
        const serviceData = await serviceModel.find() 
        res.status(200).send({msg:serviceData})
        if(!serviceData){
            res.status(400).send({msg:"service data not found"})
        }
        console.log(serviceData)
    } catch (error) {
        console.log("service",error)
    }
}
module.exports = { home, register, login, contact ,userData ,service}