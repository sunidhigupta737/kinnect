const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth',         require('./routes/auth'));
app.use('/api/people',       require('./routes/people'));
app.use('/api/medicines',    require('./routes/medicines'));
app.use('/api/appointments', require('./routes/appointments'));
app.use('/api/notes',        require('./routes/notes'));
app.use('/api/patient',      require('./routes/patient'));

app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/patient/:patientId', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/patient/index.html'));
});

app.get('/caretaker/:page', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/caretaker/' + req.params.page));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(process.env.PORT || 8000, '0.0.0.0', () => {
      console.log('🚀 Kinnect running on http://localhost:8000');
    });
  })
  .catch(err => console.error('❌ MongoDB error:', err));