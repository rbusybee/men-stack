const mongoose = require('mongoose');
const Joi = require('joi');

// Schema: customers
const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    isGold: {
        type: Boolean,
        required: true,
        default: false
    },
    phone: {
        type: String,
        required: true,
        minlength:6,
        maxlength: 15
    }
});

// Models: Customer
const Customer = mongoose.model('Customer', customerSchema, 'customers');

// Request Validation
function validateCustomer(customer) {
    const schema = {
        name: Joi.string().required().min(3).max(255),
        phone: Joi.string().required().min(6).max(15),
        isGold: Joi.boolean(),
    };
    return Joi.validate(customer, schema);
}

exports.customerSchema = customerSchema;
exports.Customer = Customer;
exports.validate = validateCustomer;