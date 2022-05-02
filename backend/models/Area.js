const mongoose = require ('mongoose')

const seccaoSchema = new mongoose.Schema({
    Insignia:  {
        type: String,
        required: true
    },
    Area:  {
        type: Array,
        required: true
    },

})

mongoose.model('area ', seccaoSchema ,'area ')