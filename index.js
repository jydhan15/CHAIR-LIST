const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

const chairs = [
  {
    name: 'Chair 1',
    description: '123',
  },
  {
    name: 'Chair 2',
    description: '143',
  },
];

app.get('/api/chairs', (req, res) => {
  res.json(chairs);
});

app.post('/api/chairs', (req, res) => {
  const { name, description } = req.body;
  const newChair = { name, description };
  chairs.push(newChair);

  res.status(201).json({
    message: 'Chair added successfully',
    chairs: newChair,
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
