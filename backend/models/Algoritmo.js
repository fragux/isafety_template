const mongoose = require ('mongoose')


const algoritmoPythonSchema = new mongoose.Schema({
    
    resultado:  {
        Seccao:  {
            type: Number,        
            required: true
        },
        Acidente:  {
            type: Number,
            required: true
        },
        Colaboradores:  {
            type: Number,
            required: true
        },
        type: Array,
        required: true
    },
    timeStamp : {
        type : Number
    }
    
})
module.exports= mongoose.model('python', algoritmoPythonSchema)