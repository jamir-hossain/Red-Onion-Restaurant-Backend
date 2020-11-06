const router = require('express').Router()

const {requireLogin} = require('../CustomMiddleware/authMiddleWare')
const FoodOrderModelData = require('../Models/foodOrderModel')
const UserSchemaData = require('../Models/userModel')

router.post('/place-order', requireLogin, async(req, res) => {
   try {
      const {_id, name, email} = req.body.user
      const shippingAddress = req.body.shipping
      const foods = req.body.foods
      const {totalItem, itemPrice, total, tax} = req.body.cost
      const orderComplete = new FoodOrderModelData({
         userID:_id, 
         name,
         email,
         foods,
         shippingAddress,
         totalItem,
         itemPrice,
         total,
         vat_and_text:tax
      })
      await orderComplete.save()
      if (orderComplete) {
         await UserSchemaData.findByIdAndUpdate(req.user._id, {
            cartFood:[]
         },{
            new:true
         })
      }
      res.send({success:"Order Successfully Placed."})
   } catch (error) {
      res.send(error)
   }
})

// Get Order Details
router.get('/get_order_details', requireLogin, async(req, res) => {
   try {
      const orderDetails = await FoodOrderModelData.find()
      res.send(orderDetails)
   } catch (error) {
      res.send(error)
   }
})



module.exports = router