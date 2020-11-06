const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const FoodModel = new mongoose.Schema({
   key:{type:String},
   name:{type:String},
   subName:{type:String},
   details:{type:String},
   price:{type:Number},
   image:{type:String},
   category:{type:String},
   quantity:{type:Number},
   addedBy:{
      type:ObjectId,
      ref:'UserSchemaData'
   }
})

const FoodCartData = mongoose.model('FoodCartData', FoodModel)
module.exports = FoodCartData