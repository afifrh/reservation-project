const salle = require("../models/salle");
const mongoose = require("mongoose");
// Controller methods
const getAll = async (req, res) => {
  try {
    const allSalleData = await salle.find();
    res.json(allSalleData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSalleById = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }
  try {
    const foundSalle = await salle.findById(id);
    if (!foundSalle) {
      return res.status(404).json({ message: "Salle not found" });
    }
    res.json(foundSalle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createSalle = async (req, res) => {
  try {
    const data = new salle({
      capacite: req.body.capacite,
      equipements: req.body.equipements,
    });

    const savedData = await data.save();
    res.json(savedData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateSalle = async (req, res) => {
  try {
    const updatedSalle = await salle.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(updatedSalle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteSalle = async (req, res) => {
  try {
    const deletedSalle = await salle.findByIdAndDelete(req.params.id);
    if (!deletedSalle) {
      return res.status(404).json({ message: "Salle not found" });
    }
    res.json({ message: "Salle deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const reserve = async (req, res) => {
  salleid = req.params.id;
  from = req.body.from;
  to = req.body.to;

  try {
    const updatedSalle = await salle.findById(salleid);
    console.log(from, to, updatedSalle);

    if (from >= to) {
      return res
        .status(401)
        .json({ message: "manajmouch ya bro tghidh 🤣 loula 1️⃣" });
    }

    for (let reservation of updatedSalle.reservations) {
      if (
        (from < reservation.to && to > reservation.to) ||
        (to <= reservation.to && from <= reservation.from) ||
        (from >= reservation.from && to <= reservation.to) ||
        (from <= reservation.from && to >= reservation.to)
      ) {
        return res.status(401).json({ message: "manajmouch ya bro tghidh 🤣" });
      }
    }
    updatedSalle.reservations.push({ from: from, to: to });
    const savedData = await updatedSalle.save();
    res.json(savedData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAll,
  getSalleById,
  createSalle,
  updateSalle,
  deleteSalle,
  reserve,
};
