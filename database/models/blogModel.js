const mongoose = require('mongoose');
const blogSchema = new mongoose.Schema({
    title:{
        type: String,
        required: 'Title is Required'
    },
    author:{
        type: String,
        require:'Author is required'
    },
    userName:{
        type: String,
        require:'Username is required'
    },
    description: String,
    likes: Number,
    dislike: Number
});

module.exports = mongoose.model('blog', blogSchema);