const express = require("express")
const router = express.Router()
const UserModel = require("../models/userModel")

router.get("/", (req, res)=>{
    res.send("Get all users")
})
router.post("/", async (req, res) => {
    let data = req.body
    await UserModel.create(data)
    res.send("User created successfully")
})

module.exports = router