const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // res.send('Welcome to API');
    res.render('index', { title: 'My Node Application', message: 'Welcome to API'});
});

module.exports = router;