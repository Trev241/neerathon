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


app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
  })
  console.log(`Server is running on port: ${port}`)
})

module.exports = app