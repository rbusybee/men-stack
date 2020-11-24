const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

module.exports = function(){
    // Error Handeller: Uncaught Exceptions
    winston.handleExceptions(
        new winston.transports.File({ filename: 'uncaughtExceptions.log' })
    );

    // Error Handeller: Unhandled Rejection
    process.on('unhandledRejection', (ex) => {
        throw ex;
    });

    // Adding logger
    winston.add(winston.transports.File, { filename: 'logfile.log' });
    winston.add(winston.transports.MongoDB, {
        db: 'mongodb://localhost/vidly2',
        level: 'info'
    });
}