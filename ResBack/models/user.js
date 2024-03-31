
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
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
    profilePic:{
        type: String
    },
   
})

module.exports = mongoose.model('user', userSchema)