const { Storage } = require("megajs")
const { MongoClient } = require("mongodb")

const Db = process.env.ATLAS_URI
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

var _db
var _megaCloud

module.exports = {

  connectToServer: async function (callback) {
    // First connect to MongoDB
    client.connect(function (err, db) {
      // Verify we got a good "db" object
      if (err || !db) {
        return callback(err)
      }
      
      _db = db.db("Neerathon");
      console.log("Successfully connected to MongoDB.")
    
      return callback()
    })

    // if (_db && _conn)
    //   return _db

    // _conn = client.connect()
    // _db = _conn.db(process.env.ATLAS_DATABASE)
    // console.log("Successfully connected to MongoDB")
  },
  
  connectToMega: async function () {
    _megaCloud = await new Storage({
      email: process.env.MEGA_EMAIL,
      password: process.env.MEGA_PASSWORD
    }).ready
  },

  getDb: function () {
    return _db
  },

  getMegaCloud: function () {
    return _megaCloud
  }
}