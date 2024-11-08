const express = require('express')
const router = express.Router()
const {Task} = require("../models/taskModel")
const jwt = require('jsonwebtoken')
const UserModel = require('../models/userModel')

const secretKey = "@Secretkey1"

router.get('/', async (req, res) => {
    let token = req.query.token
    jwt.verify(token, secretKey, async (err, decoded)=>{
        let user = await UserModel.findOne({email: decoded.email})
        let tasks = await Task.find({user: user._id});
        res.send(tasks)
    })
  })
  
router.post('/', (req, res) => {
    console.log("New task", req.body)
    jwt.verify(req.body.user, secretKey, async function(err, decoded) {
        console.log(decoded)
        let user = await UserModel.findOne({email: decoded.email})
        console.log(user)
        let task = new Task(req.body)
        task.user = user._id
        task.save()
        .then(task => {
            res.send("Added successfully")
        })
        .catch(err => {
            console.log(err)
            res.status(400).json({"message": "Bad request"})
        })
    });
})

router.put('/:id', (req, res) => {
    let id = req.params.id
    let task = req.body
    Task.findByIdAndUpdate(id, task).exec()
    res.send("Edit task")
})
  
router.delete("/:id", (req, res) => {
    let id = req.params.id
    Task.findByIdAndDelete(id).exec()
    res.send("Task Deleted")
})

module.exports = router