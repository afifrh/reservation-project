const Salle = require('../models/salle');

// Create a new salle
exports.createSalle = async (req, res) => {
  try {
    const salle = new Salle(req.body);
    await salle.save();
    res.status(201).json(salle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all salles
exports.getSalles = async (req, res) => {
  try {
    const salles = await Salle.find();
    res.json(salles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get salle by ID
exports.getSalleById = async (req, res) => {
  try {
    const salle = await Salle.findById(req.params.id);
    if (salle) {
      res.json(salle);
    } else {
      res.status(404).json({ message: 'Salle not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update salle
exports.updateSalle = async (req, res) => {
  const { capacite, equipements } = req.body;
  try {
    const salle = await Salle.findById(req.params.id);
    if (!salle) {
      return res.status(404).json({ message: 'Salle not found' });
    }
    if (capacite) salle.capacite = capacite;
    if (equipements) salle.equipements = equipements;
    // Assuming you want to update other fields, handle them similarly.

    await salle.save();
    res.json(salle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




exports.deleteSalle = async (req, res) => {
  const { id } = req.params;
  try {
    const salle = await Salle.findByIdAndDelete(id);
    if (!salle) {
      console.log(`Salle not found with id: ${id}`);
      return res.status(404).json({ message: 'Salle not found' });
    }
    console.log(`Salle with id: ${id} has been deleted.`);
    res.json({ message: 'Salle deleted' });
  } catch (error) {
    console.error(`Error deleting salle with id: ${id}: ${error}`);
    res.status(500).json({ message: error.message });
  }
};

