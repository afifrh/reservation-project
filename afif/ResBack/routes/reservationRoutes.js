const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const auth = require('../middleware/auth');


router.get('/', reservationController.getReservations);
router.get('/:id',auth.authenticateUser ,reservationController.getReservationById);
router.post('/add',auth.authenticateUser, reservationController.createReservation);
router.patch('/:id',auth.authenticateUser, reservationController.updateReservation);
router.delete('/:id',auth.authenticateUser, reservationController.deleteReservation);

module.exports =router;