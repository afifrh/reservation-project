
const express = require('express');
const router = express.Router();
const salleController = require('../controllers/salleController');
const auth = require('../middleware/auth');

// router.use(authenticate)

router.get('/', salleController.getSalles);
router.get('/:id',auth.authenticateUser, salleController.getSalleById);
router.post('/add',auth.authenticateUser, salleController.createSalle);
router.patch('/:id',auth.authenticateUser, salleController.updateSalle);
router.delete('/:id',auth.authenticateUser, salleController.deleteSalle);

module.exports =router;