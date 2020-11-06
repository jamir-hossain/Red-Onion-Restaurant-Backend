const router = require('express').Router()

// orderFoodModel
const FoodCartData = require('../Models/foodCartModel')
const UserSchemaData = require('../Models/userModel')

const {requireLogin} = require('../CustomMiddleware/authMiddleWare')


// Food Order Route 
router.post('/addTo-cart', requireLogin, async (req, res) => {
   const {name, subName, details, image, price, key, category, quantity} = req.body.singleFood
   req.user.password = undefined
   try {
      const orderedFood = new FoodCartData({
         name, 
         subName, 
         details, 
         image, 
         price, 
         key, 
         category, 
         quantity, 
         addedBy:req.user})
      await orderedFood.save()
      if (orderedFood) {
         await UserSchemaData.findByIdAndUpdate(req.user._id, {
            $push:{cartFood:orderedFood}
         },{
            new:true
         })
      }
      res.send({success:'Item added to Cart'})
   } catch (error) {
      res.status(400).send(error.message)
   }
})

// Get All Cart Food
router.get('/get-cart-food', async(req, res) => {
   try {
      const allFood = await FoodCartData.find()
      res.send(allFood)
   } catch (error) {
      res.status(400).send(error.message)
   }
})

// Get All Cart Food
router.put('/add-and-remove-quantity', requireLogin, async(req, res) => {
   const Quantity = req.body.quantity
   try {
      const updatedFood = await FoodCartData.findByIdAndUpdate({_id:req.body.foodId}, {
         quantity:Quantity
      }, {new:true})
      res.send(updatedFood)
   } catch (error) {
      res.status(400).send(error.message)
   }
})

// Remove Food from Cart
router.delete('/remove-cart-food', requireLogin, async(req, res) => {
   try {
      const updatedFood = await FoodCartData.findByIdAndDelete({_id:req.body.foodId})
      res.send(updatedFood)
      if (updatedFood) {
         await UserSchemaData.findByIdAndUpdate(req.user._id, {
            $pull:{cartFood:req.body.foodId}
         },{
            new:true
         })
      }
   } catch (error) {
      res.status(400).send(error.message)
   }
})


module.exports = router