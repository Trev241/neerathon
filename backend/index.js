const express = require("express")
const app = express()
const path = require("path")

const cors = require("cors")
require("dotenv").config()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(express.static("public"))
app.use(require("./routes/record"))

app.get('/', (req, res) => {
  res.sendFile("index.html", {root: path.join(__dirname, "public")})
})

// get driver connection
const dbo = require("./db/conn")

// app.listen(port, () => {
//   // perform a database connection when server starts
//   dbo.connectToServer(function (err) {
//     if (err) console.error(err);
//   })
//   console.log(`Server is running on port: ${port}`)
// })

// dbo.connectToServer(async function (err) {
//   if (err) {
//     console.error(err)
//     process.exit()
//   } 
  
//   app.listen(port, () => {
//     console.log(`Server running on port: ${port}`)
//   })
// })

const connectToMongo = new Promise((resolve, reject) => {
  dbo.connectToServer(function (err) {
    if (err) {
      console.error(err)
      reject(err)
    } 
    console.log("Successfully connected to MongoDB.")
    resolve()
  })
})

const connectToMega = new Promise((resolve, reject) => {
  dbo.connectToMega(function (err) {
    if (err) {
      console.error(err)
      reject(err)
    }
    console.log("Successfully connected to MEGA.")
    resolve()
  })
})

Promise.all([connectToMongo, connectToMega])
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port: ${port}`)
    })
  })
  .catch((error) => {
    console.error(error)
    process.exit()
  })

module.exports = app