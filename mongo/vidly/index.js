const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');

// Database Connection
mongoose.connect('mongodb://localhost/vidly2')
    .then(()=> console.log('Connected to MongoDB...'))
    .catch((err) => console.log('Unable to connect MongoDB...',err));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);

const port = process.env.PORT || 8080;
app.listen(port,() => console.log(`Listening on port ${port}...`));