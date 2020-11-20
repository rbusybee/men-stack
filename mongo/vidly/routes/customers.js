const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Customer, validate } = require('../models/customer');

router.get('/',async (req,res)=>{
    res.send(await Customer.find().sort('name'));
});

router.post('/', async (req,res) => {
    const { error } = validate(req.body);
    if (error ) return res.status(400).send('Bad request',error.details[0].message);
    const customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    });
    await customer.save();
    res.send(customer);
});

router.put('/:id', async (req,res) => {
    const { error } = validate(req.body);
    if (error ) return res.status(400).send('Bad request',error.details[0].message);
    const customer = await Customer.findByIdAndUpdate(req.params.id, { name: req.body.name },{
        new: true
    });
    if (!customer) return res.status(400).send('Given Customer id not found');
    res.send(customer);
});

router.delete('/:id', async (req,res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);
    if (!customer) return res.status(400).send('Given Customer id not found');
    res.send(customer);
});

router.get('/:id', async (req,res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(400).send('Given Customer id not found');
    res.send(customer);
});

module.exports = router;