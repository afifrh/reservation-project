const user = require('../models/user');
const mongoose = require('mongoose');
;



//get all users
const getAllUsers = async (req, res) => {
    try {
        const allusersData = await user.find();
        res.json(allusersData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//get user by id 
const getUserById = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid ID format' });
    }
    try {
        const foundUser = await user.findById(id);
        if (!foundUser) {
            return res.status(404).json({ message: 'Salle not found' });
        }
        res.json(foundUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




//create user
const createUser = async (req, res) => {
    try {
        const data = new user({
            name: req.body.name,
           email: req.body.email,
           password: req.body.password,
           profilePic: req.body.profilePic,
           reservations: req.body.reservations
        });

        const savedData = await data.save();
        res.json(savedData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//update user
const updateUser = async (req, res) => {
    try {
        const updatedUser = await user.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//delete user
const deleteUser = async (req, res) => {
    try {
        const deletedUser = await user.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'Salle not found' });
        }
        res.json({ message: 'user deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports ={
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser
    
}