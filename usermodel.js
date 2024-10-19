const mongoose = require('mongoose');

// Remove the leading space in the connection string
mongoose.connect('mongodb://127.0.0.1:27017/userDB')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  username: String,  // corrected 'usermame' to 'username'
});

module.exports = mongoose.model("User", userSchema);
