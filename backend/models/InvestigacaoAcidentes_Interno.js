const mongoose = require ('mongoose')

const investigacaoAcidentes_InternoSchema = new mongoose.Schema({
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
    DOP: {
        type:String,
        required:true
    },
    Codigo_SubArea: {
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
    DiaSemana_InicioInvest: {
        type:String,
        required:true
    },
    Mes_InicioInvest: {
        type:Number,
        required:true
    },
    Ano_InicioInvest: {
        type:Number,
        required:true
    },
    Causa_Acidente: {
        type:String,
        required:true
    },
    Acao: {
        type:String,
        required:true
    },
    Tipo_Causa: {
        type:String,
        required:true
    },
    Local: {
        type:String,
        required:true
    },
    Descricao_Breve: {
        type:String,
        required:true
    },

})

mongoose.model('investigacaoAcidentes_Interno ', investigacaoAcidentes_InternoSchema ,'investigacaoAcidentes_Interno ')