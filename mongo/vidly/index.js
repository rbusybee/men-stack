const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const config = require('config');
const express = require('express');
const app = express();

require('./init/logging')();
require('./init/routes')(app);
require('./init/db')();

// Handlling env variables
if (!config.get('jwtPrivateKey')) {
    console.log('FATAL ERROR: jwtPrivateKey is not defined');
    process.exit(1);
}

const port = process.env.PORT || 8080;
app.listen(port,() => console.log(`Listening on port ${port}...`));