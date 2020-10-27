const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const express = require('express');
const config1 = require('./config1');
const logger = require('./logger');
const auth = require('./authentication');
const morgan = require('morgan');
const helmet = require('helmet');
const config = require('config');
const list = require('./router/lists');
const home = require('./router/home');

const app = express();
app.use(express.json());
app.use(logger);
app.use(auth);
app.use(express.static('public'));
app.use(helmet());
app.use('/api/list', list);
app.use('/', home);

//Configuration
// console.log('App Name:' + config.get('name'));
// console.log('Mail Server:' + config.get('mail.host'));
// console.log('Mail Password:' + config.get('mail.password'));
// startupDebugger('App Name:' + config.get('name'));
// startupDebugger('Mail Server:' + config.get('mail.host'));
// startupDebugger('Mail Password:' + config.get('mail.password'));

// Rendering Templates
app.set('view engine', 'pug');
app.set('views', './views'); //default

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    startupDebugger('Morgan Enabled');
}
// console.log(`app env: ${app.get('env')}`);

//DB Debugger
dbDebugger('Database Connected');

app.listen(config1.PORT, config1.HOST, () => { console.log(`Listining on http:/ ${config1.HOST}:${config1.PORT}`) })