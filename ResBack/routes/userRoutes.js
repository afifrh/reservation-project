
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAllUsers);
router.get('/:id',userController.getUserById);
router.post('/add',userController.createUser);
router.patch('/:id',userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.post('/login',userController.login);

module.exports =router;