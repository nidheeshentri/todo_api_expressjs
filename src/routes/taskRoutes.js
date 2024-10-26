const express = require('express')
const router = express.Router()
const {Task} = require("../models/taskModel")

router.get('/', async (req, res) => {
    let tasks = await Task.find({});
    res.send(tasks)
  })
  
router.post('/', (req, res) => {
    console.log("New task", req.body.data)
    Task.create(req.body.data)
    res.send("Added successfully")
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