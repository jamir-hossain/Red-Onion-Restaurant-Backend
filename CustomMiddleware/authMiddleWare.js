const jwt = require('jsonwebtoken')
const UserSchemaData = require('../Models/userModel')
require('dotenv').config()

module.exports.requireLogin = async (req, res, next) => {
   const {authorization} = req.headers

   if(!authorization){
      return res.status(401).send({error:"You are not sing in user"})
   }
   // const token = authorization.replace("Bearer ", "")
   jwt.verify(authorization, process.env.SECRET_KEY, async (error, payload) => {
      if (error) {
         return res.status(401).send({error:"You are not sing in user"})
      }
      const {_id} = payload
      const verifyUser = await UserSchemaData.findById(_id)
      req.user = verifyUser
      next()
   })
}