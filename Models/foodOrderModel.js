const mongoose = require('mongoose')

const foodOrderModel = new mongoose.Schema({
   name:{type:String},
   email:{type:String},
   phone:{type:Number},
   city:{type:String},
   address:{type:String},
   zipCode:{type:Number},
   totalItems:[],
   totalCost:{},
   orderBy:{}
}, {timestamps:true})

const OrderedFoodData = mongoose.model('OrderedFoodData', foodOrderModel)
module.exports = OrderedFoodData