const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(console.log('Database connected successfully'))
    .catch( err => console.log('Unable to connect DB', err))

const courseSchema = new mongoose.Schema({
    tags: [String],
    date: Date,
    name: String,
    author: String,
    isPublished: Boolean,
    price: Number
})

const Course = mongoose.model('courses', courseSchema, 'courses');

async function getCourses() {
    return await Course
        .find({ isPublished: true, tags: 'backend' })
        .sort({ name: 1 })
        .select({ name: 1, author: 1, price: 1 });
}

getCourses().then((res)=> console.log(res))