const mongoose = require('mongoose')
const {ObjectId} = mongoose.SchemaType

// const OrderedFoodData = require('./orderFoodModel')

const signUpWithGoogleModel = new mongoose.Schema({
   name:{
      type:String,
   },
   email:{
      type:String,
   },
   photo:{
      type:String,
   },
})

const GoogleUserSchemaData = mongoose.model('GoogleUserSchemaData', signUpWithGoogleModel)
module.exports = GoogleUserSchemaData