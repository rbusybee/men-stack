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

// ex3().then((res)=> console.log(res));


// Updating Documnet 

async function updateCourse1(id) {
    // Approach1: Query first
    // findById()
    // Modify its properties
    // save()

    const course = await Course.findById(id);

    if (!course) return;

    course.set({
        isPublished: true,
        author: 'Another Author'
    });

    const result = await course.save();
    console.log(result);
}

updateCourse1('5a68fdc3615eda645bc6bdec');

async function updateCourse2(id) {
    // Approach: Update first
    // Update Directly
    // Optionally: get the updated document

    // const result = await Course.update({_id: id},{
    //     $set: {
    //         author: 'Romio',
    //         isPublished: false 
    //     }
    // });
    // console.log(result);

    // Get the recent update
    const result = await Course.findByIdAndUpdate(id,{
        $set: {
            author: 'Romio',
            isPublished: false 
        }
    }, {new: true });
    console.log(result);
}

updateCourse2('5a68fdc3615eda645bc6bdec');