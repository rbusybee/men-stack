const express = require('express');
const { boolean } = require('joi');
const router = express.Router();
const mongoose = require('mongoose');

const Customer = mongoose.model('Customers', new mongoose.Schema({
    isGold: {
        type: Boolean,
        required: true
    },
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    phone: {
        type: String,
        required: true,
        maxlength: 10,
        minlength: 6
    }
}));

router.get('/', async (req,res) => {
    res.send(await Customer.find().sort('name'))
});

router.get('/:id', async (req,res) => {
    try {
        const customers = await Customer.findById(req.params.id);
        res.send(customers);
    } catch(ex) {
        res.status(404).send('Customer with ID was not found in Database');
    }    
});

router.post('/', (req,res) => {

});

router.put('/:id', (req,res) => {

});

router.delete('/:id', (req,res) => {

});

module.exports = router;