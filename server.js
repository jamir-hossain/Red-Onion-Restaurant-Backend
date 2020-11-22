const express = require('express')
const app = express()
const cors = require('cors')
const session = require('express-session')
require('dotenv').config()


// Default Middleware
app.use(express.json())
app.use(cors())

// User Route
const userRoute = require('./Routers/userRoute')
app.use('/', userRoute)

// Cart Route
const cartRoute = require('./Routers/cartRoute')
app.use('/', cartRoute)

// Place Order Route
const placeOrderRoute = require('./Routers/placeOrderRoute')
app.use('/', placeOrderRoute)

app.get('/', (req, res) => {
   res.send('Welcome to node app')
})

// Database Connection
const dbConnection = require('./DBConnection/DBConnection')
dbConnection()

const PORT = process.env.PORT || 3005
app.listen(PORT, () => console.log('Server Is Successfully Running On Port '+PORT))