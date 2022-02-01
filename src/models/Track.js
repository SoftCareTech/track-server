const mongoose = require('mongoose') 

pointSchema = new mongoose.Schema({
    timestamp: {
         'Number':Number
    },
   coords: {
       latitude: Number,
       longitude: Number,
       altitude: Number
       , accuracy: Number,
       heading: Number,
       speed: Number
    },
    locations: [pointSchema]
})

trackSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId
        ,ref:'User'
    },
    name: {
        type:String,
        default:''  
    },
    locations:[pointSchema]
})

mongoose.model('Track',trackSchema)  //// this one that create a collection