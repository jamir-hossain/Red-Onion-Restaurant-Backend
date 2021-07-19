const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()


// Default Middleware
app.use(express.json())
app.use(cors())

// Place Order Route
const placeOrderRoute = require('./Routers/placeOrderRoute')
app.use('/', placeOrderRoute)

app.get('/', (req, res) => {
   res.send('Welcome to red onion backend app')
})

// Database Connection
const dbConnection = require('./DBConnection/DBConnection')
dbConnection()

const PORT = process.env.PORT || 3005
app.listen(PORT, () => console.log('Server Is Successfully Running On Port '+PORT))