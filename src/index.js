const express = require('express')

const mog = "mongodb+srv://raph-ray:jaRYjP5Y3c3JR2q@cluster0.mr4jc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const app = express()
app.get('/', (req, res) => {
    res.send("Hi")

})
app.listen(3000, () => {
    console.log("server started")
})