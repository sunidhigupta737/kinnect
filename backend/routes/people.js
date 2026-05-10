const router  = require('express').Router();
const auth    = require('../middleware/auth');
const Person  = require('../models/Person');
const { upload, cloudinary } = require('../middleware/cloudinary');

router.get('/', auth, async (req, res) => {
  try {
    const people = await Person.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(people);
  } catch(err) {
    console.error('PEOPLE ERROR:', err.message);
    res.status(500).json({ message: err.message });
  }
});

router.post('/', auth, upload.single('photo'), async (req, res) => {
  try {
    const { name, relation, phone, note } = req.body;
    if (!name || !relation) return res.status(400).json({ message: 'Name and relation required' });
    const person = await Person.create({
      userId: req.user.id, name, relation, phone, note,
      photo: req.file?.path || '',
      photoPublicId: req.file?.filename || ''
    });
    res.json(person);
  } catch(err) {
    console.error('POST PEOPLE ERROR:', err.message);
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const person = await Person.findOne({ _id: req.params.id, userId: req.user.id });
    if (!person) return res.status(404).json({ message: 'Not found' });
    if (person.photoPublicId) await cloudinary.uploader.destroy(person.photoPublicId);
    await person.deleteOne();
    res.json({ message: 'Deleted' });
  } catch { res.status(500).json({ message: 'Server error' }); }
});

module.exports = router;