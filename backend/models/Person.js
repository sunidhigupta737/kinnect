const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  userId:        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name:          { type: String, required: true },
  relation:      { type: String, required: true },
  phone:         { type: String },
  photo:         { type: String },
  photoPublicId: { type: String },
  note:          { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Person', personSchema);