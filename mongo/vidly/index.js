const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const express = require('express');
const app = express();

require('./init/logging')();
require('./init/routes')(app);
require('./init/db')();
require('./init/config')();

const port = process.env.PORT || 8080;
app.listen(port,() => console.log(`Listening on port ${port}...`));