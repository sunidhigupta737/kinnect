const router = require('express').Router();
const auth   = require('../middleware/auth');
const Note   = require('../models/Note');

router.get('/', auth, async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(notes);
  } catch { res.status(500).json({ message: 'Server error' }); }
});

router.post('/', auth, async (req, res) => {
  try {
    const { title, content, emoji } = req.body;
    if (!title || !content) return res.status(400).json({ message: 'Title and content required' });
    const note = await Note.create({ userId: req.user.id, title, content, emoji });
    res.json(note);
  } catch { res.status(500).json({ message: 'Server error' }); }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await Note.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    res.json({ message: 'Deleted' });
  } catch { res.status(500).json({ message: 'Server error' }); }
});

module.exports = router;