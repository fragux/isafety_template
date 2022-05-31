const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'basic',
        enum: ["basic", "supervisor", "admin"]
       //},
       //accessToken: {
       // type: String
       },
    date: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model('user', UserSchema);
module.exports = User;