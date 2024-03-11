require("dotenv").config()

const express = require("express")
const app = express()
const cors = require("cors")
const router = require("./router/auth-router")
const main = require("./utils/db")

const corOptions = {
    origin: "http://localhost:5173",
    methods: "GET , POST, DELETE , PUT, HEAD, PATCH",
    credentials: true
}

app.use(cors(corOptions))

app.use(express.json())

app.use("/api/auth", router)

app.get("/", (req, res) => {
    res.status(200).send("helooooo")
})
main().then(() => {
    app.listen(8000)

})
