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

exports.Customer = Customer;
exports.validate = validateCustomer;