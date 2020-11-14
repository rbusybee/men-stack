const mongoose = require('mongoose');

// Connection
mongoose.connect('mongodb://localhost/playground')
    .then(()=> console.log('Successfully connected to MongoDB'))
    .catch((err)=> console.error('Could not connected successfully', err));


// Schema
// const courseSchema = new mongoose.Schema({
//     name: String,
//     author: String,
//     tags: [String],
//     date: { type: Date, default: Date.now },
//     isPublished: Boolean
// });

// // Model
// const Course = mongoose.model('Courses', courseSchema, 'courses');