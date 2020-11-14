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
        enum: ['web', 'mobile', 'network'],
        lowercase: true,
        // uppercase: true,
        trim: true
    },
    author: String,
    tags: {
        type: Array,
        // Custom Validators
        validate: {
            validator: function(v) {
                return v && v.length > 0;
            },
            message: 'A course should have atleast one tag'
        }
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        // Dependent in-built validator
        required: function() { return this.isPublished; },
        min: 10,
        max: 200,
        // It works when we reading from DB
        get: v => Math.round(v),
        // It works when we are writing on DB
        set: v => Math.round(v)
    },
    sponsor: {
        type: Array,
        validate: {
            //Added Async Validators
            isAsync: true,
            validator: function(v, callback) {
                setTimeout(()=>{
                    // Do some async work
                    const res = v && v.length > 0;
                    callback(res)
                }, 4000);
            },
            message: 'Course has atleast one sponsor'
        }
    }
});

// Model
const Course = mongoose.model('Courses', courseSchema, 'courses');

// Saving Data
async function createCourse() {
    const course = new Course({
        name: 'Angular Course',
        category: 'network',
        author: 'Romio',
        tags: ['angular', 'frontend'],
        isPublished: true,
        price: 15.8,
        sponsor: ['McGrawHill']
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
        // console.log(ex.message);
 
        // Validation Errors
        for (field in ex.errors){
            console.log(ex.errors[field].message);
        }
    }
}

async function getCourse() {
    const courses = await Course
        .find({_id: '5fafffde62481f3252ae397d'})
        .select({price: 1})

    console.log(courses[0].price);
}

// Calling
// createCourse();
getCourse();