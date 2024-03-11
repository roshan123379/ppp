const jwt = require("jsonwebtoken")

const User = require("../models/user")

const authMiddleWare = async(req,res,next)=>{

    const token = req.header("Authorization")
    if(!token){
        res.status(400).send("tokenn not get")
    }
    const jwttoken = token.replace("Bearer","").trim()
    console.log(jwttoken)
    

    try {

        const isVarified = jwt.verify(jwttoken,process.env.SECRET_KEY)
        console.log(isVarified)
        

        const userDatas = await User.findOne({email:isVarified.email}).select({password:0})
        
        
        console.log(userDatas)

        req.user = userDatas
        req.token = token
        req.userId = userDatas._id


        next()
    } catch (error) {
        console.log("token",error)
        return res.status(400).send({msg:"eror token"})
    }

    

}

module.exports = authMiddleWare