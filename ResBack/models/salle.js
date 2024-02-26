
const mongoose = require('mongoose');

const salleSchema = new mongoose.Schema({
  
    capacite: {
        required: true,
        type: String
    },
    equipements: {
        required: true,
        type: Array
    },
    disponibilite: {
        type: Date,
        required: false
    },
})

module.exports = mongoose.model('salle', salleSchema)