const winston = require('winston');
const express = require('express');
const app = express();

require('./init/logging')();
require('./init/routes')(app);
require('./init/db')();
require('./init/config')();
require('./init/validation')();

const port = process.env.PORT || 8080;
app.listen(port,() => winston.info(`Listening on port ${port}...`)); 