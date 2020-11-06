const mongoose = require('mongoose')

const foodOrderModel = new mongoose.Schema({
   userID:{type:String},
   name:{type:String},
   email:{type:String},
   foods:[],
   shippingAddress:{},
   totalItem:{type:Number},
   itemPrice:{type:Number},
   total:{type:Number},
   vat_and_text:{type:Number}
}, {timestamps:true})

const FoodOrderModelData = mongoose.model('FoodOrderModelData', foodOrderModel)
module.exports = FoodOrderModelData