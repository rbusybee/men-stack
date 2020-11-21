const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { User, validate } = require('../models/user');
const _ = require('lodash');
const bcrypt = require('bcrypt');

router.get('/',async (req,res)=>{
    res.send(await User.find().sort('email'));
});

router.post('/', async (req,res) => {
    const { error } = validate(req.body);
    if (error ) return res.status(400).send('Bad request',error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered');

    // Use joi-password-complexity to check password validation
    user = new User(_.pick(req.body, ['name','email','password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    res.send(_.pick(user, ['_id','name','email']));
});

module.exports = router;