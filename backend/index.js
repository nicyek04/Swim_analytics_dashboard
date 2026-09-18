const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Route 1: Returns a list of students
app.get('/api/swimmers', (req, res) => {
  const swimmers = [
    { id: 1, name: 'Alex', squad: 'Elite', main_stroke: 'Freestyle' },
    { id: 2, name: 'Jordan', squad: 'Development', main_stroke: 'Butterfly' },
    { id: 3, name: 'Taylor', squad: 'Junior', main_stroke: 'Backstroke' }
  ];
  res.json(swimmers);
});

// Route 2: Returns mock lap times for a performance chart
app.get('/api/performance', (req, res) => {
  const performance = [
    { week: 'Week 1', time_seconds: 34.5 },
    { week: 'Week 2', time_seconds: 33.8 },
    { week: 'Week 3', time_seconds: 32.2 },
    { week: 'Week 4', time_seconds: 31.5 }
  ];
  res.json(performance);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});