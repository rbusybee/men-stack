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

// getCourses().then((res)=> console.log(res))

// Exercise 2
async function ex2() {
    return await Course
        .find({ isPublished: true, tags: { $in: ['frontend','backend']}})
        .or([{tags: 'frontend', tags: 'backend' }])
        .sort({ price: -1 })
        .select('name author price')
}

// ex2().then((res)=> console.log(res))


// Exercise 3

async function ex3() {
    return await Course
        .find({ isPublished: true})
        .or([
            { price: { $gte: 15 } },
            { name: /.*by.*/ }
        ])
}

ex3().then((res)=> console.log(res)) 

