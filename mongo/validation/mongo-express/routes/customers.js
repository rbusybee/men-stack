const express = require('express');
const router = express.Router();
const { Customer, validate } = require('../models/customer');


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
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let customer = new Customer({
        isGold:req.body.isGold,
        name:req.body.name,
        phone:req.body.phone
    });
    customer = await customer.save();
    res.send(customer);
});

router.put('/:id', async (req,res) => {
    const { error } = validate(req.body);
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

router.delete('/:id', async (req,res) => {
    try {
        const customers = await Customer.findByIdAndRemove(req.params.id);
        res.send(customers);
    } catch(ex) {
        res.status(404).send('Customer with ID was not found in Database');
    }  
});

module.exports = router;