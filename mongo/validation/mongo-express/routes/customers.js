const express = require('express');
const { boolean } = require('joi');
const router = express.Router();
const mongoose = require('mongoose');
const Joi = require('joi');

// Model & Schema for Mongoose
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

// Validation Function to validate request body
function validateCustomer(customer) {
    const schema = {
        isGold: Joi.boolean().required(),
        name: Joi.string().min(3).max(255).required(),
        phone: Joi.string().required()
    };
    return Joi.validate(customer, schema);
}

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

router.post('/', async (req,res) => {
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = new Customer({
        isGold:req.body.isGold,
        name:req.body.name,
        phone:req.body.phone
    });
    customer = await customer.save();
    res.send(customer);
});

router.put('/:id', async (req,res) => {
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try{
        const customer = await Customer.findByIdAndUpdate(req.params.id,{
            isGold:req.body.isGold,
            name:req.body.name,
            phone:req.body.phone
        },{
            new: true
        });
    
        res.send(customer);
    }
    catch(ex) {
        res.status(404).send('Customer with ID was not found in Database');
    }
});

router.delete('/:id', (req,res) => {

});

module.exports = router;