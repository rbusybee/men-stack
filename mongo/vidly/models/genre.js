const mongoose = require('mongoose');
const Joi = require('joi');

// Schema: genres
const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    }
});

// Models: Genre
const Genre = mongoose.model('Genre', genreSchema, 'genres');

// Request Validation
function validateGenre(genre) {
    const schema = {
        name: Joi.string().required().min(3)
    };
    return Joi.validate(genre, schema);
}

exports.genreSchema = genreSchema;
exports.Genre = Genre;
exports.validate = validateGenre;