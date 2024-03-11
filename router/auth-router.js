const express = require("express")
const {home,register,login ,contact,userData,service} = require("../controllers/auth-controller")
const authMiddleWare = require("../middleware/jwtvarify-middleware")





const router = express.Router()

router.route("/").get(home)

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/contact").post(contact)
router.route("/userData").get(authMiddleWare,userData)
router.route("/service").get(service)

module.exports= router