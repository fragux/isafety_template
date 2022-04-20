const mongoose = require ('mongoose')

const dadosAcidente_internoSchema = new mongoose.Schema({
    DT: {
        type:Number,
        required:true
    },
    Dia_ocorrencia: {
        type:Number,
        required:true
    },
    Mes_ocorrencia: {
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
    COD_Subarea: {
        type:String,
        required:true
    },
    Mes_criacao: {
        type:Number,
        required:true
    },
    Classificacao: {
        type:String,
        required:true
    },
    Mes_ausencia: {
        type:Number,
        required:true
    },
    /*Hora que deixou de trabalhar: {
        type:Number,
        required:true
    },*/
    N_Assistencia: {
        type:Number,
        required:true
    },
    Codigo_genero: {
        type:Boolean,
        required:true
    },
    Idade: {
        type:Number,
        required:true
    },
    Antiguidade: {
        type:Number,
        required:true
    },
    Departamento: {
        type:String,
        required:true
    },
    Codigo_local_incidente: {
        type:Number,
        required:true
    },
    Descricao: {
        type:String,
        required:true
    },
    Codigo_local_acidente: {
        type:Number,
        required:true
    },
    Codigo_posto: {
        type:Number,
        required:true
    },
    Codigo_Tarefa_Acidente: {
        type:Number,
        required:true
    }, 
    Codigo_Tipo_material: {
        type:Number,
        required:true
    },
    Codigo_Acontecimento_Acidente: {
        type:Number,
        required:true
    },
    Codigo_Materiais_AssociadosAcidente_Origem: {
        type:Number,
        required:true
    },
    Codigo_Eventos_AssociadosAcidente: {
        type:Number,
        required:true
    },
    Codigo_Materiais_AssociadosAcidente: {
        type:Number,
        required:true
    },
    Codigo_Tarefa_Descrita: {
        type:Number,
        required:true
    },
    Codigo_Natureza_Lesao: {
        type:Number,
        required:true
    },
    Codigo_PartesCorpo_Atingidas: {
        type:Number,
        required:true
    }, 
    Codigo_Intervencao_MeiosTransporte: {
        type:Number,
        required:true
    },
    Codigo_Intervencao_Terceiros: {
        type:Number,
        required:true
    },
    Codigo_Hospitalizado: {
        type:Number,
        required:true
    },
    Mes_Participacao: {
        type:Number,
        required:true
    },
    Dia_Participacao: {
        type:Number,
        required:true
    },
    Tipo_LesaoTrabalhada: {
        type:String,
        required:true
    },
    Zona_CorpoAtingida: {
        type:String,
        required:true
    },
    Cluster_horario: {
        type:String,
        required:true
    },
    Total_DiasUteis: {
        type:Number,
        required:true
    },
    Localidade_Prestacao_PrimeirosSocorros: {
        type:String,
        required:true
    },
    NTotal_ColaboradoresEmpresa: {
        type:Number,
        required:true
    },
    NTotal_ColaboradoresUnidade: {
        type:Number,
        required:true
    },
    Codigo_Periodo_OcorreAcidente: {
        type:Number,
        required:true
    },
    Retribuicao_desde: {
        type:Number,
        required:true
    },
    Codigo_PostoTrabalho: {
        type:Number,
        required:true
    },


})

mongoose.model('dadosAcidente_interno ', dadosAcidente_internoSchema ,'dadosAcidente_interno ')