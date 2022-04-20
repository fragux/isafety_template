const mongoose = require ('mongoose')
const Schema =mongoose.Schema;

const saidaSchema = new Schema({
    Nivel_risco:  {
        type: mongoose.Types.Decimal128,
        required:true
    },
    lojaId: {type : mongoose.Schema.Types.ObjectId,ref: 'loja' }
   
}, { timestamps: true } );
var saidaalgoritmo= mongoose.model('saida', saidaSchema);
module.exports =  saidaalgoritmo;








