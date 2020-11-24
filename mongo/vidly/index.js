require('express-async-errors');

const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const config = require('config');
const winston = require('winston');
require('winston-mongodb');

const express = require('express');
const app = express();

require('./init/routes')(app);

require('./init/db')();


// Error Handeller: Uncaught Exceptions
winston.handleExceptions(
    new winston.transports.File({ filename: 'uncaughtExceptions.log' })
);

// Error Handeller: Unhandled Rejection
process.on('unhandledRejection', (ex) => {
    throw ex;
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



const port = process.env.PORT || 8080;
app.listen(port,() => console.log(`Listening on port ${port}...`));