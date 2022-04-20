const mongoose = require ('mongoose')

const dadosTransacoesSchema = new mongoose.Schema({
    Dia:  {
        type: Number,
        required:true
    },
    Mes:  {
        type: Number,
        required:true
    },
    Ano:  {
        type: Number,
        required:true
    },
    Insignia:  {
        type: String,
        required:true
    },
    DOP:  {
        type: String,
        required:true
    },
    Codigo_Subarea:  {
        type: String,
        required:true
    },
    Codigo_Recteck:  {
        type: String,
        required:true
    },
    Area:  {
        type: String,
        required:true
    },
    Seccao:  {
        type: String,
        required:true
    },
    Business_Unit:  {
        type: Number,
        required:true
    },
    N_Ticket:  {
        type: Number,
        required:true
    },

})

mongoose.model('dadosTransacoes ', dadosTransacoesSchema  ,'dadosTransacoes ')