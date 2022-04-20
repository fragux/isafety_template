const mongoose = require ('mongoose')

const dadosQuaseAcidentes_internosSchema = new mongoose.Schema({
    Mes_ocorrencia: {
        type:Number,
        required:true
    },
    DiaSemana_ocorrencia: {
        type:Number,
        required:true
    },
    Ano_ocorrencia: {
        type:Number,
        required:true
    },
    Hora_ocorrencia: {
        type:Number,
        required:true
    },
    Insignia: {
        type:String,
        required:true
    },
    Codigo_SubArea: {
        type:String,
        required:true
    },
    Tipo_sinistrado: {
        type:String,
        required:true
    },
    Mes_Criacao: {
        type:Number,
        required:true
    },
    DiaSemana_Criacao: {
        type:String,
        required:true
    },
    Ano_Criacao: {
        type:Number,
        required:true
    },
    Area: {
        type:String,
        required:true
    },
    Seccao: {
        type:String,
        required:true
    },
    Local: {
        type:String,
        required:true
    },
    Causa: {
        type:String,
        required:true
    },
    Grau_Risco: {
        type:Number,
        required:true
    },
    Probabilidade: {
        type:Number,
        required:true
    },
    Severidade: {
        type:Number,
        required:true
    },
})

mongoose.model('dadosQuaseAcidentes_internos ', dadosQuaseAcidentes_internosSchema ,'dadosQuaseAcidentes_internos ')