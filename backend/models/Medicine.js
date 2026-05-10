const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name:   { type: String, required: true },
  dose:   { type: String, required: true },
  time:   { type: String, required: true },
  days:   { type: String, default: 'Everyday' },
  note:   { type: String },
  taken:  { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Medicine', medicineSchema);
