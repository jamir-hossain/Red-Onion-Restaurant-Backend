const router = require('express').Router()
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken');
require('dotenv').config()

// User Schema
const UserSchemaData = require('../Models/userModel')
const GoogleUserSchemaData = require('../Models/googleSignUp')

const {requireLogin} = require('../CustomMiddleware/authMiddleWare');


// User Registration
router.post('/signup-user', [
   check('name', 'Name is require').notEmpty(),
   check('email', 'Email is require').notEmpty(),
   check('email', 'Email is not valid').isEmail(),
   check('password', 'Password is require').notEmpty(),
   check('confirm_password', 'Confirm Password is require').notEmpty(),
   check('confirm_password').custom((value, {req}) => {
      if (value !== req.body.password) {
         throw new Error ("Confirm Password Is Not Match")
      }else{
         return true
      }
   })
] , async (req, res) => {
   try {
      const {name, email, password} = req.body.data
      const errors = validationResult(req)
      if (!errors.isEmpty) {
         const errorObj = errors.array().filter( object => object.msg)[0]
         return res.status(400).send({error:errorObj.msg})
      }

      const usedEmail = await UserSchemaData.findOne({email:email})
      if (usedEmail) {
         return res.status(400).send({error:"This email is already used."})
      }
      const hashedPassword = await bcrypt.hash(password, 10)
      const user = new UserSchemaData({
         name,
         email,
         password:hashedPassword
      })
      await user.save()
      res.send({success:"User Registration is Successful"})
   } catch (error) {
      res.send(error.message)
   }
})

// Get User
router.get('/get-user', requireLogin, async(req, res) => {
   try {
      const user = await UserSchemaData.findById(req.user._id)
      res.send(user)
   } catch (error) {
      res.send(error)
   }
})

// User Login
router.post('/user-signIn', async(req, res) => {
   console.log(req.body.signIn)
   try {
      const {email, password} = req.body.signIn
      const correctUser = await UserSchemaData.findOne({email:email})
      const {_id, name} = correctUser
      if (!correctUser) {
         return res.send({message:'Email is not correct'})
      }
      const correctPassword = await bcrypt.compare(password, correctUser.password)
      if (!correctPassword) {
         return res.send({message:'Password is not correct'})
      }
      const token = await jwt.sign({ _id:_id, name:name, email:correctUser.email }, process.env.SECRET_KEY, { expiresIn: "2h"});
      console.log(token)
      res.send({message:'You are Successfully Sign In.', token:token})
   } catch (error) {
      res.send(error.message)
   }
})

// User Login With Google
router.post('/signup-with-google', async (req, res) => {
   try {
      const {name, email, photo} = req.body.user
      const checkUser = await GoogleUserSchemaData.findOne({email:email})
      if (checkUser) {
         return res.send({have:'Already Have'})
      }
      const googleUser = new GoogleUserSchemaData({
         name,
         email,
         photo
      })
      await googleUser.save()
      // const {_id, name, email} = googleUser
      // const token = await jwt.sign({ _id:_id, name:name, email:email }, 'secret_key', { expiresIn: "24h"});
      res.send({success:'You are Successfully Sign In.'})
   } catch (error) {
      res.send(error.message)
   }
})



module.exports = router