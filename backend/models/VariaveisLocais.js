const mongoose = require ('mongoose')

const variaveisLocaisSchema = new mongoose.Schema({
    Nome:  {
        type: String,
        
        required: true
    },
    Email:  {
        type: String,
        
        required: true
    },
    Password:  {
        type: String,
        
        required: true
    },
    telemovel:  {
        type: Number,
        
        required: true
    },

})

mongoose.model('variaveisLocais ', variaveisLocaisSchema ,'variaveisLocais ')