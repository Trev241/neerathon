const express = require("express")
 
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router()
 
// Fetching connection helper functions
const { connectToMongo, connectToMega } = require("../db/conn") 

// Convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId

// Middleware for handling files
const multer = require('multer')
const upload = multer({
  limits: {fileSize: 1000000}
})

// UUIDv4 
const { v4: uuidv4 } = require("uuid") 

// Fetch all records
recordRoutes.route("/record").get(async (req, res) => {
  let db_connect = await connectToMongo().db(process.env.ATLAS_DATABASE)

  const records = await db_connect
    .collection("Participant")
    .find({})
    .toArray()

  return res.json(records)
})
 
// Fetch record by ID
recordRoutes.route("/record/id/:id").get(async (req, res) => {
  let db_connect = await connectToMongo().db(process.env.ATLAS_DATABASE)

  const record  = await db_connect
    .collection("Participant")
    .findOne({ _id: ObjectId(req.params.id )})
  
  return res.json(record)
})

recordRoutes.route("/record/uuid/:uuid").get(async (req, res) => {
  let db_connect = await connectToMongo().db(process.env.ATLAS_DATABASE)
  
  const record = await db_connect
    .collection("Participant")
    .findOne({ uuid: req.params.uuid })
  
  return res.json(record)
})

// Create record
recordRoutes.route("/record/add").post(upload.single("paymentAttachment"), async (req, response, error) => {
  const file = req.file 
  let db_connect = await connectToMongo().db(process.env.ATLAS_DATABASE)
  let mega_connect = await connectToMega()
  
  const collection = db_connect.collection("Participant")
  
  // Check if UUID has already been used
  let newUuid = uuidv4()
  while (await collection.countDocuments({ uuid: newUuid }) > 0)
    newUuid = uuidv4()
  
  let myobj = {
    uuid: newUuid,
    name: req.body.name,
    email: req.body.email,
    isJosephite: req.body.isJosephite,
    registerNumber: req.body.registerNumber,
    gender: req.body.gender,
    event: req.body.event,
    transactionId: req.body.transactionId
  };

  res = await collection.insertOne(myobj)

  const filename = `${res.insertedId} (${req.body.name}|${req.body.email}).png`
  await mega_connect.upload(filename, Buffer.from(file.buffer, 'base64')).complete
  console.log(`Saved image to MEGA as ${filename}`)
  console.log("Registration was successful")

  // Append UUID to response
  res["uuid"] = newUuid

  return response.json(res)
})
 
// Update record
recordRoutes.route("/record/update/:id").post(async (req, res) => {
  let db_connect = await connectToMongo().db(process.env.ATLAS_DATABASE)

  let myquery = { _id: ObjectId(req.params.id) }
  let newvalues = {
    $set: {
      name: req.body.name,
      email: req.body.email,
      isJosephite: req.body.isJosephite,
      registerNumber: req.body.registerNumber,
      gender: req.body.gender,
      event: req.body.event,
      transactionId: req.body.transactionId
    },
  }
  
  const result = await db_connect
    .collection("Participant")
    .updateOne(myquery, newvalues)

  return res.json(result)
})
 
// Delete record
recordRoutes.route("/record//delete/:id").delete(async (req, res) => {
  let db_connect = await connectToMega().db(process.env.ATLAS_DATABASE)

  let myquery = { _id: ObjectId(req.params.id) }
  const result = await db_connect
    .collection("Participant")
    .deleteOne(myquery)

  return res.json(result)
})

module.exports = recordRoutes