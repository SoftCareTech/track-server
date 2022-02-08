require('./models/User')
require('./models/Track')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const localUrl = 'mongodb://localhost:27017/track-movement-db'
const authRoute = require('./routes/authRoutes')
const trackRoute = require('./routes/trackRoutes')
const requireAuth = require('./middlewares/requireAuth')



const app = express()
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json())
app.use(authRoute)

try {
    mongoose.connect(localUrl)  /// v6 options is not needed 
    mongoose.connection.on('connected', () => {
        console.log("conneted db")
    })
    mongoose.connection.on('error', (err) => {
        console.error("Error conneting db", err)
    })
} catch (e) {
    console.error("Error conneting db too much", err)
}
app.get('/p', (req, res) => {
    res.send("Hi   get P")

})
app.post('/p', (req, res) => {
    res.send("Hi   Post  P")
})
app.get('/', requireAuth, (req, res) => {
    res.send("Hi  " + req.user.email)

})
app.use(trackRoute)
app.listen(3000, () => {
    console.log("server started")
})