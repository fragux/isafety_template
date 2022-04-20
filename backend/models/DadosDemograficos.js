const mongoose = require ('mongoose')

const dadosdemograficosSchema = new Schema({
    Sub_areaID:  {
        type: String,
        required:true
    },
    Unidade_organizacionalID:  {
        type: String,
        required:true
    },
    Area:  {
        type: String,
        required:true
    },
    Horas_trabalhadas:  {
        type: Number,
        required:true
    },
    FTE_Medio:  {
        type: Number,
        required:true
    },
    Head_Count:  {
        type: Number,
        required:true
    },
    Media_idades:  {
        type: Number,
        required:true
    },
    Antiguidades_valoresMedia:  {
        type: Number,
        required:true
    },
    Feminoino:  {
        type: Number,
        required:true
    }, 
    Absentismo:  {
        type: Number,
        required:true
    },
})

mongoose.model('dadosdemograficos ', dadosdemograficosSchema ,'dadosdemograficos ')