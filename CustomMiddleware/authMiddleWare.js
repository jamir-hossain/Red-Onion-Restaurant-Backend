const admin = require("firebase-admin");
const serviceAccount = require("../red-onion-restaurant-25d46-firebase-adminsdk-zwh63-0742717572.json");
admin.initializeApp({
   credential: admin.credential.cert(serviceAccount),
   databaseURL: "https://red-onion-restaurant-25d46.firebaseio.com"
 });

module.exports.requireLogin = (req, res, next) => {
   const {authorization} = req.headers
   if(!authorization){
      return res.status(401).send({error:"You are not sing in user"})
   }
   admin.auth().verifyIdToken(authorization)
   .then((decodedToken) => {
      req.user = decodedToken
      next()
   })
   .catch((error) => {
      res.status(401).send({error: error.message})
   });
}