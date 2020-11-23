const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

// Schema: User
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    isAdmin: {
        type: Boolean
    }
});

// Token generator logic encapsulating with Mongoose Model
userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'));
    return token;
}

// Models: User
const User = mongoose.model('User', userSchema, 'users');

// Request Validation
function validateUser(user) {
    const schema = {
        name: Joi.string().required().min(5).max(50),
        email: Joi.string().required().min(5).max(255).email(),
        password: Joi.string().required().min(5).max(255)
    };
    return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;