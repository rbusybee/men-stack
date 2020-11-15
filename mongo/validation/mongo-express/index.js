const mongoose = require('mongoose');
const Joi = require('joi');
const genres = require('./routes/genres');
const express = require('express');
const app = express();

// Database Connection
mongoose.connect('mongodb://localhost/vidly')
    .then(()=> console.log('Connected to MongoDB...'))
    .catch(err => console.log('Could not connected to MongoDB'));

app.use(express.json());
app.use('/api/genres', genres);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));