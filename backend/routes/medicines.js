const router   = require('express').Router();
const auth     = require('../middleware/auth');
const Medicine = require('../models/Medicine');

router.get('/', auth, async (req, res) => {
  try {
    const meds = await Medicine.find({ userId: req.user.id }).sort({ time: 1 });
    res.json(meds);
  } catch { res.status(500).json({ message: 'Server error' }); }
});

router.post('/', auth, async (req, res) => {
  try {
    const { name, dose, time, days, note } = req.body;
    if (!name || !dose || !time) return res.status(400).json({ message: 'Name, dose and time required' });
    const med = await Medicine.create({ userId: req.user.id, name, dose, time, days, note });
    res.json(med);
  } catch { res.status(500).json({ message: 'Server error' }); }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const med = await Medicine.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body, { new: true }
    );
    res.json(med);
  } catch { res.status(500).json({ message: 'Server error' }); }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await Medicine.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    res.json({ message: 'Deleted' });
  } catch { res.status(500).json({ message: 'Server error' }); }
});

router.post('/reset', auth, async (req, res) => {
  try {
    await Medicine.updateMany({ userId: req.user.id }, { taken: false });
    res.json({ message: 'Reset done' });
  } catch { res.status(500).json({ message: 'Server error' }); }
});

module.exports = router;