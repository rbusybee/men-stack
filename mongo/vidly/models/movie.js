const mongoose = require('mongoose');
const Joi = require('joi');
const { genreSchema } = require('./genre')

// Schema: movies
const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    genre: {
        type: genreSchema,
        required: true
    }
});

// Models: Movie
const Movie = mongoose.model('Movie', movieSchema, 'movies');

// Request Validation
function validateMovie(movie) {
    const schema = {
        title: Joi.string().required().min(5).max(255),
        numberInStock: Joi.number().required().min(0).max(255),
        dailyRentalRate: Joi.number().required().min(0).max(255),
        genreId: Joi.objectId().required()
    };
    return Joi.validate(movie, schema);
}

exports.movieSchema = movieSchema;
exports.Movie = Movie;
exports.validate = validateMovie;