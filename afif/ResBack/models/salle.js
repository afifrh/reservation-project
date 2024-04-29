const mongoose = require("mongoose");

const salleSchema = new mongoose.Schema({
  capacite: {
    required: true,
    type: String,
  },
  equipements: {
    required: true,
    type: Array,
  },
  reservations: [
    { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Reservation'
     }],
});

module.exports = mongoose.model("salle", salleSchema);
