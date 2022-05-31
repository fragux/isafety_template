const mongoose = require ('mongoose')


const alertas = new mongoose.Schema({
    
   
        Titulo:  {
            type: String,        
            required: true
        },
        Descricao:  {
            type: String,
            required: true
        },
        Risco:  {
            type: String,
            required: true
        },
        
        Envio:  {
            type: String,
            required: true
        },
    },
   
    
)
module.exports= mongoose.model('alerta', alertas)