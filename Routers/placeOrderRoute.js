const router = require('express').Router()
const {requireLogin} = require('../CustomMiddleware/authMiddleWare')
const OrderedFoodData = require('../Models/foodOrderModel')


router.post('/place-order', requireLogin, async(req, res) => {
   try {
      const {name, email, phone, city, address, zipCode, totalItems, totalCost} = req.body
      const orderComplete = new OrderedFoodData({
         name, 
         email, 
         phone, 
         city, 
         address, 
         zipCode, 
         totalItems, 
         totalCost,
         orderBy: {
            user_id: req.user.user_id, 
            name: req.user.name, 
            email: req.user.email
         }
      })
      await orderComplete.save()
      res.send({orderComplete, success:"Order Successfully Placed."})
   } catch (error) {
      res.send({error: error.message})
   }
})

// Get Order Details
router.get('/get/order/details', requireLogin, async(req, res) => {
   try {
     const orderDetails = await OrderedFoodData.find()
      res.send(orderDetails)
   } catch (error) {
      res.send({error: error.message})
   }
})



module.exports = router