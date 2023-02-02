const express = require("express")
 
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router()
 
// This will help us connect to the database
const dbo = require("../db/conn") 

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId

const multer = require('multer')
const upload = multer({
  limits: {fileSize: 1000000}
})

// This section will help you get a list of all the records.
recordRoutes.route("/record").get(function (req, res) {
  let db_connect = dbo.getDb()
  db_connect
    .collection("Participant")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err
      res.json(result)
    })
})
 
// This section will help you get a single record by id
recordRoutes.route("/record/:id").get(function (req, res) {
  let db_connect = dbo.getDb()
  let myquery = { _id: ObjectId(req.params.id) }
  db_connect
    .collection("Participant")
    .findOne(myquery, function (err, result) {
      if (err) throw err
      res.json(result)
    })
})

// This section will help you create a new record.
// recordRoutes.route("/record/add").post(async function (req, response) {
recordRoutes.post("/record/add", upload.single("paymentAttachment"), async (req, response, next) => {
  let db_connect = dbo.getDb()
  let mega_connect = dbo.getMegaCloud()

//  console.log(db_connect)
//  console.log(dbo)

  let myobj = {
    name: req.body.name,
    email: req.body.email,
    isJosephite: req.body.isJosephite,
    josephiteDetails: req.body.josephiteDetails,
    gender: req.body.gender,
    event: req.body.event,
    transactionId: req.body.transactionId
    //  paymentAttachment: req.body.paymentAttachment
  };
  
  const filename = `${req.body.name}+${req.body.email}.png`
  await mega_connect.upload(filename, Buffer.from(req.file.buffer, 'base64')).complete
  console.log(`Saved image as ${filename}`)
  
  db_connect.collection("Participant").insertOne(myobj, function (err, res) {
    if (err) throw err
    response.json(res)
  })
})
 
// This section will help you update a record by id.
recordRoutes.route("/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb()
  let myquery = { _id: ObjectId(req.params.id) }
  let newvalues = {
    $set: {
      name: req.body.name,
      email: req.body.email,
      isJosephite: req.body.isJosephite,
      josephiteDetails: req.body.josephiteDetails,
      gender: req.body.gender,
      event: req.body.event,
      paymentAttachment: req.body.paymentAttachment
    },
  }
  db_connect
    .collection("Participant")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err
      console.log("1 document updated")
      response.json(res)
    })
})
 
// This section will help you delete a record
recordRoutes.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb()
  let myquery = { _id: ObjectId(req.params.id) }
  db_connect.collection("Participant").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted")
    response.json(obj)
  })
})
 
// endpoint to fetch all registered users
recordRoutes.route("/participants").get(function(req, res) {
  const db_connect = dbo.getDb();

  db_connect.collection("Participant").find({}).toArray(function(err, users) {
    if(err) {
      return res.json({ "message": "Couldn't fetch users" })
    }

    return res.json({ users })
  })
})

module.exports = recordRoutes