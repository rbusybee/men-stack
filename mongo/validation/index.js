const mongoose = require('mongoose');

// Connection
mongoose.connect('mongodb://localhost/playground')
    .then(()=> console.log('Successfully connected to MongoDB'))
    .catch((err)=> console.error('Could not connected successfully', err));


// Schema
const courseSchema = new mongoose.Schema({
    name: {type: String, required: true },
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: Number
});

// Model
const Course = mongoose.model('Courses', courseSchema, 'courses');

// Saving Data
async function createCourse() {
    const course = new Course({
        name: 'Angular Course',
        author: 'Romio',
        tags: ['angular', 'frontend'],
        isPublished: true,
        price: 15
    });
    
    try{
        // Using Callback to validate and continue
        // await course.validate((err) => {
        //     if(err) {
        //         console.log('Problem Occured', err);
        //     } else {
        //         console.log('No Problem');
        //     }
        // });

        // Using Implicit validation checking during Save()
        const result = await course.save();
        console.log(result);
    }
    catch(ex) {
        console.log(ex.message);
    }
}

// Calling
createCourse();