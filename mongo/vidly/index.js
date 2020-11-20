const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Database Connection
mongoose.connect('mongodb://localhost/vidly2')
    .then(()=> console.log('Connected to MongoDB...'))
    .catch((err) => console.log('Unable to connect MongoDB...',err));

app.use(express.json());

const port = process.env.PORT || 8080;
app.listen(port,() => console.log(`Listening on port ${port}...`));