const mongoose = require ('mongoose')

const dadosFormacaoSchema = new mongoose.Schema({
    dataadmissao:  {
        type: String,
        
        required: true
    },
    Sexo:  {
        type: String,
        
        required: true
    },
    TipoEvento:  {
        type: String,
        
        required: true
    },
    CategoriaEvento:  {
        type: Number,
        
        required: true
    },
    HorasSST:  {
        type: Number,
        
        required: true
    },


})

mongoose.model('dadosFormacao ', dadosFormacaoSchema ,'dadosFormacao ')