const express = require('express');
const Joi = require('@hapi/joi');

var config = require('./config')

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to API');
});

app.listen(config.PORT, config.HOST, () => { console.log(`Listining on http:/ ${config.HOST}:${config.PORT}`) })