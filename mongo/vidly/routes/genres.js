const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Genre, validate } = require('../models/genre');
const auth = require('../middleware/auth');
const { admin } = require('../middleware/role');

router.get('/',async (req,res)=>{
    res.send(await Genre.find().sort('name'));
});

router.post('/', auth, async (req,res) => {
    const { error } = validate(req.body);
    if (error ) return res.status(400).send('Bad request',error.details[0].message);
    const genre = new Genre({
        name: req.body.name
    });
    await genre.save();
    res.send(genre);
});

router.put('/:id', async (req,res) => {
    const { error } = validate(req.body);
    if (error ) return res.status(400).send('Bad request',error.details[0].message);
    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name },{
        new: true
    });
    if (!genre) return res.status(400).send('Given Genre id not found');
    res.send(genre);
});

router.delete('/:id', [auth, admin], async (req,res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if (!genre) return res.status(400).send('Given Genre id not found');
    res.send(genre);
});

router.get('/:id', async (req,res) => {
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(400).send('Given Genre id not found');
    res.send(genre);
});

module.exports = router;