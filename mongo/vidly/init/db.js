module.exports = function(mongoose) {
    // Database Connection
    mongoose.connect('mongodb://localhost/vidly2')
    .then(()=> console.log('Connected to MongoDB...'))
    .catch((err) => console.log('Unable to connect MongoDB...',err));
}