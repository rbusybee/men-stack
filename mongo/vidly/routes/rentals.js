const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Rental, validate } = require('../models/rental');
const { Movie } = require('../models/movie');
const { Customer } = require('../models/customer');
const Fawn = require('fawn');

Fawn.init(mongoose);

router.get('/',async (req,res)=>{
    res.send(await Rental.find().sort('name'));
});

router.post('/', async (req,res) => {
    const { error } = validate(req.body);
    if (error ) return res.status(400).send('Bad request',error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if(!customer) return res.status(400).send('Invalid Customer');

    const movie = await Movie.findById(req.body.movieId);
    if(!movie) return res.status(400).send('Invalid Movie');

    if (movie.numberInStock === 0) return res.status(400).send('Movie not in Stock');

    const rental = new Rental({
        title: req.body.title,
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        },
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        }
    });

    // Transactions
    try {
        new Fawn().Task()
            .save('rentals', rental)
            .update('movies',{ _id: movie._id},{
                $inc: { numberInStock: -1 }
            })
            .run();
        res.send(rental);
    }
    catch(ex) {
        res.status(500).send('Transaction failed');
    }
});

router.put('/:id', async (req,res) => {
    const { error } = validate(req.body);
    if (error ) return res.status(400).send('Bad request',error.details[0].message);
    const rental = await Rental.findByIdAndUpdate(req.params.id, { name: req.body.name },{
        new: true
    });
    if (!rental) return res.status(400).send('Given Movie id not found');
    res.send(rental);
});

router.delete('/:id', async (req,res) => {
    const rental = await Rental.findByIdAndRemove(req.params.id);
    if (!rental) return res.status(400).send('Given Rental id not found');
    res.send(rental);
});

router.get('/:id', async (req,res) => {
    const rental = await Rental.findById(req.params.id);
    if (!rental) return res.status(400).send('Given Rental id not found');
    res.send(rental);
});

module.exports = router;