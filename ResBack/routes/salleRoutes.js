
const express = require('express');
const router = express.Router();
const salleController = require('../controllers/salleController');

router.get('/', salleController.getAll);
router.get('/:id', salleController.getSalleById);
router.post('/add', salleController.createSalle);
router.patch('/:id', salleController.updateSalle);
router.delete('/:id', salleController.deleteSalle);
router.post('/:id/reserve',salleController.reserve)

module.exports =router;