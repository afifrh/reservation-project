const user = require('../models/user');
const mongoose = require('mongoose');
const jwt=require('jsonwebtoken');
const bcrypt =require('bcrypt');

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
        const { name, email, password, profilePic, reservations } = req.body;
        const existingUser=await user.findOne({email});
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new user({
            name,
            email,
            password: hashedPassword,
            profilePic,
            reservations,
        });
        const savedUser = await newUser.save();
        
        // Generate JWT
        const token = jwt.sign({ userId: savedUser._id }, 'your_secret_key', { expiresIn: '1h' });
        
        res.json(savedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
//login and generate jwt
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userlogin = await user.findOne({ email });
        if (!userlogin) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check password using bcrypt.compare
        const passwordMatch = await bcrypt.compare(password, userlogin.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT
        const token = jwt.sign({ userId: userlogin._id }, 'your_secret_key', { expiresIn: '1h' });

        res.json({ token, userlogin });
    } catch (err) {
        res.status(500).json({ message: err.message });
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
    deleteUser,
    login
}