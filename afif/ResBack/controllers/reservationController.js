const Reservation = require('../models/reservation');

// Create a new reservation
const Salle = require('../models/salle');

// Create a new reservation
exports.createReservation = async (req, res) => {
  const { userId, salleId, startTime, endTime } = req.body;

  try {
    // Check if the salle exists
    const salle = await Salle.findById(salleId);
    if (!salle) {
      return res.status(404).json({ message: 'Salle not found' });
    }

    // Check if the salle has enough capacity
    const reservationsForSalle = await Reservation.find({
      salle: salleId,
      startTime: { $lt: endTime },
      endTime: { $gt: startTime }
    });
    

    // Create the reservation
    const reservation = new Reservation({
      user: userId,
      salle: salleId,
      startTime,
      endTime,
      // Add other fields as needed
    });
    
    await reservation.save();
    res.status(201).json(reservation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// Get all reservations
exports.getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get reservation by ID
exports.getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (reservation) {
      res.json(reservation);
    } else {
      res.status(404).json({ message: 'Reservation not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update reservation
exports.updateReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (reservation) {
      reservation.startTime = req.body.startTime || reservation.startTime;
      reservation.endTime = req.body.endTime || reservation.endTime;
      // Update other fields as needed
      await reservation.save();
      res.json(reservation);
    } else {
      res.status(404).json({ message: 'Reservation not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete reservation
exports.deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (reservation) {
      await reservation.remove();
      res.json({ message: 'Reservation deleted' });
    } else {
      res.status(404).json({ message: 'Reservation not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
