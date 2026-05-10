const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  userId:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctor:   { type: String, required: true },
  location: { type: String },
  date:     { type: String, required: true },
  time:     { type: String, required: true },
  note:     { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);