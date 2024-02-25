const express=require('express');

const mongoose = require('mongoose');
app=express();
app.use(express.json());
const PORT = 3000;
require('dotenv').config();
const mongoString='mongodb+srv://rania:rania@work.errgaiy.mongodb.net/reservation?retryWrites=true&w=majority&appName=work'

//db connection
//const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);
const database = mongoose.connection;
database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
});
// routes 
const salleRoutes = require("./routes/salleRoutes");
app.use("/salle", salleRoutes);
const userRoutes= require("./routes/userRoutes");

app.use("/user", userRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });