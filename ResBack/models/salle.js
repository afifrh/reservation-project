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
  reservations: {
    type: Array,
  },
});

module.exports = mongoose.model("salle", salleSchema);
