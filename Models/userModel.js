const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

// const OrderedFoodData = require('./orderFoodModel')

const signUpModel = new mongoose.Schema({
   name:{
      type:String,
      required:true
   },
   email:{
      type:String,
      required:true
   },
   password:{
      type:String,
      required:true
   },
   cartFood:[{
      type:ObjectId,
      ref:'FoodCartData'
   }]
})

const UserSchemaData = mongoose.model('UserSchemaData', signUpModel)
module.exports = UserSchemaData