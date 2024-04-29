
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.get('/',auth.authenticateUser, userController.getAllUsers);
router.get('/:id',auth.authenticateUser,userController.getUserById);
router.post('/add',userController.createUser);
router.patch('/:id',auth.authenticateUser,userController.updateUser);
router.delete('/:id',auth.authenticateUser, userController.deleteUser);
router.post('/login', userController.login);


module.exports =router;