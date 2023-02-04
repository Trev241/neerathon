const { Storage } = require("megajs")
const { MongoClient } = require("mongodb")

// The singleton pattern is not appropriate for Serverless depolyments due to their stateless nature.
// It is possible that these variables will lose their value and become undefined during runtime.
// var _db
// var _megaCloud

function connectToMongo() {
  const client = new MongoClient(process.env.ATLAS_URI, { useNewUrlParser: true, useUnifiedTopology: true})
  
  return client
}

async function connectToMega() {
  const client = await new Storage({
    email: process.env.MEGA_EMAIL,
    password: process.env.MEGA_PASSWORD
  }).ready

  return client
}

module.exports = {
  connectToMega,
  connectToMongo
}