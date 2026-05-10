
const router      = require('express').Router();
const User        = require('../models/User');
const Person      = require('../models/Person');
const Medicine    = require('../models/Medicine');
const Appointment = require('../models/Appointment');

router.get('/:patientId', async (req, res) => {
  try {
    const user = await User.findOne({ patientId: req.params.patientId }).select('-password');
    if (!user) return res.status(404).json({ message: 'Patient not found' });
    const people       = await Person.find({ userId: user._id });
    const medicines    = await Medicine.find({ userId: user._id }).sort({ time: 1 });
    const appointments = await Appointment.find({ userId: user._id }).sort({ date: 1 });
    res.json({ patientName: user.patientName, people, medicines, appointments });
  } catch { res.status(500).json({ message: 'Server error' }); }
});

module.exports = router;