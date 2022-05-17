const mongoose = require ('mongoose')

const colab = new mongoose.Schema({
    
    AmbienteSeg:  {
        type: Number,
        
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
        min: 0,
        max: 5,
        required: true
    },
    EwaMat:  {
        type: Number,
        min: 0,
        max: 50,
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
    Genero:  {
        type: Number,
        min: 0,
        max: 1,
        required: true
    },
    GrauDependencia:  {
        type: Number,
        
        required: true
    },
    MacroTarefa:  {
        type: Number,
        
        required: true
    },
    MicroTarefa:  {
        type: Number,
        
        required: true
    },
    NClientes:  {
        type: Number,
        min: 0,
        max: 5,
        required: true
    },
    NDependentes:  {
        type: Number,
        min: 0,
        max: 10,
        required: true
    },
    NivelExFisica:  {
        type: Number,
        min: 0,
        max: 10,
        required: true
    },
    NivelMovReptitivos:  {
        type: Number,
        min: 0,
        max: 10,
        required: true
    },
    PossivelAcidente:  {
        type: Number,
        min: 0,
        max: 1,
        required: true
    },
    PreocPessoais:  {
        type: Number,
        required: true
    },
    PreocTrab:  {
        type: Number,
        required: true
    },
    Processo:  {
        type: Number,
       
        required: true
    },
    Seccao:  {
        type: Number,
        
        required: true
    },
    SitEsforco:  {
        type: Number,
        required: true
    },
    TempoSec:  {
        type: Number,
        
        required: true
    },
    TempoTrabOutraSec:  {
        type: Number,
        
        required: true
    },
    TrabOutraSec:  {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('colaborador', colab)