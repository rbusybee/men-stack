require('express-async-errors');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const config = require('config');
const error = require('./middleware/error');
const winston = require('winston');
require('winston-mongodb');

// Error Handeller: Uncaught Exceptions
process.on('uncaughtException', (ex) => {
    winston.error(ex.message, ex);
});

// Error Handeller: Unhandled Rejection
process.on('unhandledRejection', (ex) => {
    winston.error(ex.message, ex);
});

// Error Throw
// throw new Error('Something failed during startup');

// Adding logger
winston.add(winston.transports.File, { filename: 'logfile.log' });
winston.add(winston.transports.MongoDB, {
    db: 'mongodb://localhost/vidly2',
    level: 'info'
});

// Handlling env variables
if (!config.get('jwtPrivateKey')) {
    console.log('FATAL ERROR: jwtPrivateKey is not defined');
    process.exit(1);
}

// Database Connection
mongoose.connect('mongodb://localhost/vidly2')
    .then(()=> console.log('Connected to MongoDB...'))
    .catch((err) => console.log('Unable to connect MongoDB...',err));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use(error);

const port = process.env.PORT || 8080;
app.listen(port,() => console.log(`Listening on port ${port}...`));