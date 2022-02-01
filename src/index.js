require('./models/User')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const localUrl = 'mongodb://localhost:27017/track-movement-db'
const mongoURL = "mongodb+srv://raph-ray:passwordnew@cluster0.mr4jc.mongodb.net/track-db?retryWrites=true&w=majority"
const authRoute = require('./routes/authRoutes')
const requireAuth = require('./middlewares/requireAuth')



const app = express()
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

app.get('/', requireAuth, (req, res) => {
    res.send("Hi  " + req.user.email)

})
app.listen(3000, () => {
    console.log("server started")
})