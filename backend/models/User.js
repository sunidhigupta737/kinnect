const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  email:       { type: String, required: true, unique: true },
  password:    { type: String, required: true },
  patientId:   { type: String, unique: true },
  patientName: { type: String, default: 'My Patient' }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);