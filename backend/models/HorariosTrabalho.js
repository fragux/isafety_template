const mongoose = require ('mongoose')

const horariostrabalhoSchema = new mongoose.Schema({
    Insignia:  {
        type: String,
        
        required: true
    },
    DOP:  {
        type: String,
        
        required: true
    },
    Subarea:  {
        type: String,
        
        required: true
    },
    UnidadeOrganizacional:  {
        type: String,
        
        required: true
    },
    Idade:  {
        type: Number,
        
        required: true
    },
    Sexo:  {
        type: String,
        
        required: true
    },
    PessoasHorario:  {
        type: Number,
        
        required: true
    },

})

mongoose.model('horariostrabalho ', horariostrabalhoSchema ,'horariostrabalho ')