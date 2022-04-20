const mongoose = require ('mongoose')
const Schema =mongoose.Schema;

const ewaSchema = new Schema({
    RCMat: {
        type:String,
        required:true
    },
    RCProc: {
        type:String,
        required:true
    },
    RCSec: {
        type:String,
        required:true
    },
    REFA: {
        type:String,
        required:true
    },
    CODUO: {
        
        type:Number,
        required:true
    },
    CODMit: {
        type:String,
        required:true
    },
    CODMat: {
        type:String,
        required:true
    },
    CODSEC: {
        type:String,
        required:true
    },
    CODINS: {
        type:String,
        required:true
    },
    CDOP: {
        type:String,
        required:true
    },
    CRETECK: {
        type:String,
        required:true
    },
    CUNID: {
        type:String,
        required:true
    },
    CAREA: {
        
        type:Number,
        required:true
    },
    CSEC: {
        type:String,
        required:true
    },
    CODPROC: {
        
        type:Number,
        required:true
    },
    CMAT: {
        
       type:Number,
       required:true
   },
   CMIT:  {
      
        type: mongoose.Types.Decimal128,
        required:true
    },
    EWA2_AtividadeFisica: {
        type:Number,
        required:true
    },

    EWA3_MMC: {
        type:Number,
        required:true
    },

    EWA4_PosturaMovimentos: {
        type:Number,
        required:true
    },

    EWA5_RiscoAcidente: {
        type:Number,
        required:true
    },

    EWA6_ConteudoTrabalho: {
        type:Number,
        required:true
    },

    EWA7_RestritividadeTrabalho: {
        type:Number,
        required:true
    },

    EWA8_ComunicacaoTrabalho: {
        type:Number,
        required:true
    },

    EWA9_TomadaDecisao: {
        type:Number,
        required:true
    },
    EWA10_Repetitividade: {
        type:Number,
        required:true
    },
    EWA11_NivelAtencao: {
        type:Number,
        required:true
    },
    EWA12_Iluminacao: {
        type:Number,
        required:true
    },
    EWA13_AmbienteTermico: {
        type:Number,
        required:true
    },
    EWA14_Ruido: {
        type:Number,
        required:true
    },
    EWA1_LocalTrabalho2: {
        type:Number,
        required:true
    },
    EWA2_AtividadeFisica2: {
        type:Number,
        required:true
    },
    EWA3_MMC2: {
        type:Number,
        required:true
    },
    EWA4_PosturaMovimentos2: {
        type:Number,
        required:true
    },

    EWA5_RiscoAcidente2: {
        type:Number,
        required:true
    },

    EWA6_ConteudoTrabalho2: {
        type:Number,
        required:true
    },

    EWA7_RestritividadeTrabalho2: {
        type:Number,
        required:true
    },

    EWA8_ComunicacaoTrabalho2: {
        type:Number,
        required:true
    },
    EWA9_TomadaDecisao2: {
        type:Number,
        required:true
    },
    EWA10_Repetitividade2: {
        type:Number,
        required:true
    },
    EWA11_NivelAtencao2: {
        type:Number,
        required:true
    },
    EWA12_Iluminacao2: {
        type:Number,
        required:true
    },
    EWA13_AmbienteTermico2: {
        type:Number,
        required:true
    },
    EWA14_Ruido2: {
        type:Number,
        required:true
    },
    FinalP1: {
        type:Number,
        required:true
    },
    FinalP2: {
        type:Number,
        required:true
    },
    FinalP3: {
        type:Number,
        required:true
    },
    FinalP4: {
        type:Number,
        required:true
    },
    FinalP5: {
        type:Number,
        required:true
    },
    FinalP6: {
        type:Number,
        required:true
    },
    FinalP7: {
        type:Number,
        required:true
    },
    FinalP8: {
        type:Number,
        required:true
    },

    FinalP9: {
        type:Number,
        required:true
    },

    FinalP10: {
        type:Number,
        required:true
    },
    FinalP11: {
        type:Number,
        required:true
    },
    FinalP12: {
        type:Number,
        required:true
    },
    FinalP13: {
        type:Number,
        required:true
    },
    FinalP14: {
        type:Number,
        required:true
    },
    CriterioEWA_Microtarefa: {
        type:Number,
        required:true
    },
    Y_Microtarefa: {
        type:Number,
        required:true
    },
    EWA_MicroCriterio: {
        type:Number,
        required:true
    },
    Tempo: {
        type:Number,
        required:true
    },
    EWA_Macrotarefa: {
        type:Number,
        required:true
    },
    Y_Macrotarefa: {
        type:Number,
        required:true
    },
    Processo_Ti: {
        type:Number,
        required:true
    },
    EWA_Processo: {
        type:Number,
        required:true
    },
    Y_Processo: {
        type:Number,
        required:true
    },
    FTE_Seccao: {
        type:Number,
        required:true
    },
    HHT_Seccao: {
        type:Number,
        required:true
    },
    HHHTI_Seccao: {
        type:Number,
        required:true
    },
    Y_Seccao: {
        type:Number,
        required:true
    },
    FTE_Area: {
        type:Number,
        required:true
    },
    HHT_Area: {
        type:Number,
        required:true
    },
    HHTI_Area: {
        type:Number,
        required:true
    },
    YRelativo_Area: {
        type:Number,
        required:true
    },
    EWA_Area: {
        type:Number,
        required:true
    },
    Y_Seccao: {
        type:Number,
        required:true
    },
    Y_Area: {
        type:Number,
        required:true
    },
    FTE_Loja: {
        type:Number,
        required:true
    },
    HHT_Loja: {
        type:Number,
        required:true
    },
    EWA_Loja: {
        type:Number,
        required:true
    },
    YLoja: {
        type:Number,
        required:true
    },
    


})

module.exports = mongoose.model('ewa', ewaSchema)