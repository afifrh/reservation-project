
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    password: {
        type: String,
        required: true
    },
  
   
})

module.exports = mongoose.model('user', userSchema)