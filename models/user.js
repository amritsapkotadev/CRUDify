const { name } = require('ejs');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/testapp1');
const userschema = mongoose.Schema({
    name: String,
    image: String,
    password: String,
    email: String,
});

module.exports = mongoose.model('User', userschema);