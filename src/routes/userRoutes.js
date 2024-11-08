const express = require("express")
const router = express.Router()
const UserModel = require("../models/userModel")
var jwt = require('jsonwebtoken');

const secretKey = "@Secretkey1"

router.get("/", (req, res)=>{
    res.send("Get all users")
})
router.post("/", async (req, res) => {
    let data = req.body
    await UserModel.create(data)
    res.send("User created successfully")
})

router.post("/login", (req, res) => {
    let data = req.body
    let email = data.email
    let password = data.password
    UserModel.findOne({email: email, password: password}).exec()
    .then(user => {
        console.log(user)
        if (user){
            var token = jwt.sign({ email: email }, secretKey);
            res.json({token: token})
        }
        else{
            res.send("Invalid credentials")
        }
    })
    .catch(err => {
        console.log(err)
        res.send("Login failed")
    })
})

module.exports = router