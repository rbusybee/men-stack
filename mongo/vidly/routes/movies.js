const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Movie, validate } = require('../models/movie');
const { Genre } = require('../models/genre')

router.get('/',async (req,res)=>{
    res.send(await Movie.find().sort('name'));
});

router.post('/', async (req,res) => {
    const { error } = validate(req.body);
    if (error ) return res.status(400).send('Bad request',error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(400).send('Invalid Genre');

    const movie = new Movie({
        title: req.body.title,
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,
        genre: {
            _id: genre._id,
            name: genre.name
        }
    });
    await movie.save();
    res.send(movie);
});

router.put('/:id', async (req,res) => {
    const { error } = validate(req.body);
    if (error ) return res.status(400).send('Bad request',error.details[0].message);
    const movie = await Movie.findByIdAndUpdate(req.params.id, { name: req.body.name },{
        new: true
    });
    if (!movie) return res.status(400).send('Given Movie id not found');
    res.send(movie);
});

router.delete('/:id', async (req,res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id);
    if (!movie) return res.status(400).send('Given Movie id not found');
    res.send(movie);
});

router.get('/:id', async (req,res) => {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(400).send('Given Movie id not found');
    res.send(movie);
});

module.exports = router;