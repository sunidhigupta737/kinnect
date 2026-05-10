const router      = require('express').Router();
const auth        = require('../middleware/auth');
const Appointment = require('../models/Appointment');

router.get('/', auth, async (req, res) => {
  try {
    const appts = await Appointment.find({ userId: req.user.id }).sort({ date: 1 });
    res.json(appts);
  } catch { res.status(500).json({ message: 'Server error' }); }
});

router.post('/', auth, async (req, res) => {
  try {
    const { doctor, location, date, time, note } = req.body;
    if (!doctor || !date || !time) return res.status(400).json({ message: 'Doctor, date and time required' });
    const appt = await Appointment.create({ userId: req.user.id, doctor, location, date, time, note });
    res.json(appt);
  } catch { res.status(500).json({ message: 'Server error' }); }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await Appointment.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    res.json({ message: 'Deleted' });
  } catch { res.status(500).json({ message: 'Server error' }); }
});

module.exports = router;