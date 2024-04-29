const user = require('../models/user');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

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
        const { username, email, password,  } = req.body;
        const existingUser=await user.findOne({email});
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new user({
            username,
            email,
            password: hashedPassword,
        });
        const savedUser = await newUser.save();
        
        // Generate JWT
        const token = jwt.sign({ userId: savedUser._id }, 'your_secret_key', { expiresIn: '1h' });
        res.cookie('authToken', token, { httpOnly: true });
        res.json(savedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
//login and generate jwt
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userLogin = await user.findOne({ email });
        if (!userLogin) {
            console.log('No user found with that email');
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const passwordMatch = await bcrypt.compare(password, userLogin.password);
        if (!passwordMatch) {
            console.log('Password does not match');
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const payload = {
            user: {
              id: user.id,
            },
          };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' }, (err, token) => {
            if (err) throw err;
            res.status(200).json({ message: 'Login successful', user: userLogin, token });
          });
        // const token = jwt.sign({  },process.env.JWT_SECRET, { expiresIn: '1h' });
        // console.log('JWT generated');
        // res.json({ token, user: userLogin });
    } catch (err) {
        console.error('Login error:', err.message);
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