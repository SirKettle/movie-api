const mongoose = require('mongoose');
const { Schema } = mongoose;

// Note: ID is missing - because mongoose will assign an
// ID by default to all schemas

const DogSchema = new Schema({
  name: String,
  breed: String,
  habits: [String],
});

module.exports = mongoose.model('Dog', DogSchema);
