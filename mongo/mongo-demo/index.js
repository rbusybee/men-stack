const mongoose = require('mongoose');

// Connect to MongoDB Database
mongoose.connect('mongodb://localhost/playground')
    .then(()=> console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connected to MongoDB..', err));

// mongoose.connect('mongodb://localhost/playground', {useNewUrlParser: true})

// Create Schema(Shape of the document in Database)
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

// Compile Schema to a Model
const Course = mongoose.model('Courses', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Angular Course',
        author: 'romio',
        tags: ['angular', 'frontend'],
        isPublished: true
    });
    
    // Save data to Database
    const result = await course.save();
    console.log(result);
}

// createCourse()

// Querying document from Collection

async function getCourses(){
    const queryResult = await Course
        .find({ author: 'Romio', isPublished: true })
        .limit(10)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1 });

    console.log(queryResult[0]);
}

getCourses();



