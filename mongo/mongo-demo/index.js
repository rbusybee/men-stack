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
const Course = mongoose.model('Courses', courseSchema, 'courses');

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
        .find({ isPublished: true })
        .limit(10)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1 });
    console.log(queryResult[0]);
}

// getCourses();

// Comparison Operators

// eq (equal)
// ne (not equal)
// gt (greater than)
// gte (greater than or equal to)
// lt (less than)
// lte (less than or equal to)
// in
// nin (not in)

// .find({ price: { $gte: 10, $lte: 20 }})
// .find({ price: { $in: [10,15,20] }})



// Logical Query Operators

// or
// and

// .find()
// .or([{ author: 'romio' }, {isPublished: true}])
// .and([])


// Added Regular Expression

// Start with Romio (^ => starts with)
// .find({author: /^Romio/i })

// Ends with Sarkar ($ => ends with and i => case incensetive)
// .find({ author: /Sarkar$/i })

// Contains word romio (* => any string)
// .find({ author: /.*Romio.*/i })

// Pagination

async function pagination(){
    const pageNumber = 2;
    const pageSize = 10;
    // /api/courses?pageNumber=2&pageSize=10

    const queryResult = await Course
        .find({ isPublished: true })
        .skip((pageNumber-1)*pageSize)
        .limit(pageSize)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1 });
    console.log(queryResult[0]);
}

pagination();



