const mongoose = require ('mongoose')
/*const algoritmoSchema = new mongoose.Schema({
    
    Genero:  {
        type: Number,
        
        required: true
    },
    Seccao:  {
        type: Number,
        min: 0,
        max: 5,
        required: true
    },
    Tempo:  {
        type: Number,
        min: 0,
        max: 5,
        required: true
    },
    ND:  {
        type: Number,
        min: 0,
        max: 5,
        required: true
    },
    GD:  {
        type: Number,
        min: 0,
        max: 5,
        required: true
    },
    Deslocacao:  {
        type: Number,
        min: 0,
        max: 5,
        required: true
    },
    Distancia:  {
        type: Number,
     
        required: true
    },
    Deslocacao:  {
        type: Number,
        
        required: true
    },
    TOS:  {
        type: String,
       
        required: true
    },
    TTOS:  {
        type: Number,
        min: 0,
        max: 50,
        required: true
    },
    PT:  {
        type: String,
       
        required: true
    },
    PP:  {
        type: String,
        
        required: true
    },
    NC:  {
        type: Number,
        min: 0,
        max: 5,
        required: true
    },
    NEF:  {
        type: Number,
        min: 0,
        max: 5,
        required: true
    },
    NMR:  {
        type: Number,
        min: 0,
        max: 5,
        required: true
    },
    SE:  {
        type: String,
        
        required: true
    },
    AS:  {
        type: Number,
        min: 0,
        max: 5,
        required: true
    },
    Processo:  {
        type: Number,
       
        required: true
    },
    Mat:  {
        type: Number,
       
        required: true
    },
    Mit:  {
        type: String,
       
        required: true
    },
   
    EwaMit:  {
        type: Number,
        min: 0,
        max: 50,
        required: true
    },
    EwaProc:  {
        type: Number,
        min: 0,
        max: 50,
        required: true
    },
    EwaMat:  {
        type: Number,
       
        required: true
    },
    Acidente:  {
        type: Number,
       
        required: true
    },
    
})
mongoose.model('algoritmo ', algoritmoSchema ,'algoritmo ')*/

const historicoSchema = new mongoose.Schema({
    Nivel_risco:  {
        type: mongoose.Types.Decimal128,
        required:true
    },
    Codigoloja:  {
        type: String,
       
        required: true
    },
    LojaId: {type : mongoose.Schema.Types.ObjectId,ref: 'loja' },

    SaidaAlgoritmo : {
        type: Array,
        required: true
    }
}, { timestamps: true } );
module.exports = mongoose.model('historico', historicoSchema)
