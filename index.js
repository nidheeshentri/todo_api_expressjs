const express = require('express')
const app = express()
const mongoose = require('mongoose');
const port = 3000
var cors = require('cors')

var allowlist = ['http://localhost:5173', 'http://127.0.0.1:5173']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

async function main() {
    await mongoose.connect('mongodb+srv://nidheeshb:todo_password@maincluster.sy3el.mongodb.net/?retryWrites=true&w=majority&appName=mainCluster');
    console.log("DB connected")
}

main()


const TaskSchema = new mongoose.Schema({
    task: String,
    isCompleted: Boolean,
    user: String
});

const Task = mongoose.model('task', TaskSchema);

// get
// post
// put
// delete

// CRUD
// R - get all data

app.use(cors(corsOptionsDelegate))

app.use(express.json())

app.get('/', async (req, res) => {
  let tasks = await Task.find({});
  res.send(tasks)
})

app.post('/', (req, res) => {
  console.log(req.body.data)
  Task.create(req.body.data)
  res.send("Added successfully")
})

app.put('/:id', (req, res) => {
    let id = req.params.id
    let task = req.body
    Task.findByIdAndUpdate(id, task).exec()
    res.send("Edit task")
})

app.delete("/:id", (req, res) => {
  let id = req.params.id
    Task.findByIdAndDelete(id).exec()
    res.send("Task Deleted")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})