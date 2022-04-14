const mongoose = require ('mongoose')

const colaboradorSchema = new mongoose.Schema({
    
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
mongoose.model('colaborador ', colaboradorSchema ,'colaborador ')

const lojaDataModel = new mongoose.Schema({
    DT: {
        type:Number,
        required:true
    },
    DTCC: {
        type:Number,
        required:true
    },
    DTCCFR: {
        type:Number,
        required:true
    },
    Distrito: {
        type:String,
        required:true
    },
    Concelho: {
        type:String,
        required:true
    },
    Freguesia: {
        type:String,
        required:true
    },
    Morada: {
        type:String,
        required:true
    },
    CodigoPost: {
        type:String,
        required:true
    },
    Localidade: {
        type:String,
        required:true
    },
    Cadeia:{
        type: String,
        required: true
    },
    Insignia: {
        type:String,
        required:true
    },
    DOP: {
        type:String,
        required:true
    },
    Nome: {
        type:String,
        required:true
    },
    CodigoLoja: {
        type:String,
        required:true
    },
    AreaVenda: {
        type:Number,
        required:true
    },
    AnoAbertur: {
        type:Number,
        required:false
    },
    Lat: {
        type:String,
        required:true
    },
    Long: {
        type:String,
        required:true
    },
    Disponivel: {
        type:Boolean,
        required:true
    },
    Nivel_risco: {
        type:String,
        required:true
    },

    dataAlgoritmo : {
        type: [colaboradorSchema],
        required: true
    }

},{

 
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('loja', lojaDataModel)