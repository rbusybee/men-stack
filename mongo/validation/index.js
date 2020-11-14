const mongoose = require('mongoose');

// Connection
mongoose.connect('mongodb://localhost/playground')
    .then(()=> console.log('Successfully connected to MongoDB'))
    .catch((err)=> console.error('Could not connected successfully', err));


// Schema
const courseSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
        minlength: 5,
        maxlength: 255,
        // match: /pattern/ 
    },
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'iOS']
    },
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function() { return this.isPublished; },
        min: 10,
        max: 200
    }
});

// Model
const Course = mongoose.model('Courses', courseSchema, 'courses');

// Saving Data
async function createCourse() {
    const course = new Course({
        name: 'Angular Course',
        category: 'web',
        author: 'Romio',
        tags: ['angular', 'frontend'],
        isPublished: true,
        price: 50
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