const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { User } = require('../models/user');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

// Auth Route
router.post('/', async (req,res) => {
    const { error } = validate(req.body);
    if (error ) return res.status(400).send('Bad request',error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password');

    const token = jwt.sign({_id: user._id}, config.get('jwtPrivateKey'));
    res.send(token);
});

// Request Validation
function validate(req) {
    const schema = {
        email: Joi.string().required().min(5).max(255).email(),
        password: Joi.string().required().min(5).max(255)
    };
    return Joi.validate(req, schema);
}

module.exports = router;