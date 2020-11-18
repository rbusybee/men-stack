const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors: [authorSchema]
}));

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId) {

    // Update byFindId
    // const course = await Course.findById(courseId);
    // course.author.name = 'Mosh Hamedani';
    // course.save()

    // Update directly
    const course = await Course.update({_id: courseId},{
        // Update
        $set: {
            'author.name': 'Romio'
        }

        // Remove
        // $unset: {
        //     'author': ''
        // }
    });
}

async function addAuthor(courseId, author) {
    const course = await Course.findById(courseId);
    course.authors.push(author);
    course.save();
}
async function removeAuthor(courseId, authorId) {
    const course = await Course.findById(courseId);
    const author = course.authors.id(authorId);
    author.remove();
    course.save()
}

removeAuthor('5fb4dddeb783b23037f04cf4','5fb4df12b901cc30e1adfde0');

// addAuthor('5fb4dddeb783b23037f04cf4', new Author({ name: 'Jhon' }));

// updateAuthor('5fb4d7ab1e37532bfdfd7825');

// createCourse('Node Course', [
//     new Author({ name: 'Mosh' }),
//     new Author({ name: 'Romio' })
// ]);