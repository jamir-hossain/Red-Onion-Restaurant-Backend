const mongoose = require('mongoose')
require('dotenv').config()
const uri = process.env.DB_PATH

const dbConnection = async () => {
   try {
      await mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
      console.log("Database is successfully connected")
   } catch (error) {
      console.log('Database Connection Failed')
   }
}

module.exports = dbConnection