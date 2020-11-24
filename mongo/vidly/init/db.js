const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function() {
    // Database Connection
    mongoose.connect('mongodb://localhost/vidly2')
        .then(()=> winston.info('Connected to MongoDB...'));
}