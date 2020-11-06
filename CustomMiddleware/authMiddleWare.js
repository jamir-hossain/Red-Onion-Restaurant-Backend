const jwt = require('jsonwebtoken')
const UserSchemaData = require('../Models/userModel')

module.exports.requireLogin = async (req, res, next) => {
   const {authorization} = req.headers
   if(!authorization){
      return res.status(401).send({error:"You are not sing in user"})
   }
   jwt.verify(authorization, 'secret_key', async (error, payload) => {
      if (error) {
         return res.status(401).send({error:"You are not sing in user"})
      }
      const {_id} = payload
      const verifyUser = await UserSchemaData.findById(_id)
      req.user = verifyUser
      next()
   })
}