const mongoose = require ('mongoose')

const investigacaoQuaseAcidentes_InternoSchema = new mongoose.Schema({
    Mes_ocorrencia:  {
        type: String,
        
        required: true
    },
    Dia_semana:  {
        type: String,
        
        required: true
    },
    Ano_ocorrencia:  {
        type: String,
        
        required: true
    },
    hora_ocorrencia:  {
        type: String,
        
        required: true
    },

})

mongoose.model('investigacaoQuaseAcidentes_Interno ', investigacaoQuaseAcidentes_InternoSchema ,'investigacaoQuaseAcidentes_Interno ')