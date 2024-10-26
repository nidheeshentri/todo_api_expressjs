const express = require('express')
const app = express()
const mongoose = require('mongoose');
const port = 3000
var cors = require('cors')
const TaskRouter = require("./src/routes/taskRoutes")
const UserRouter = require("./src/routes/userRoutes")


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

app.use(cors(corsOptionsDelegate))

app.use(express.json())

app.use("/task", TaskRouter)
app.use("/user", UserRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})