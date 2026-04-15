const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let characters = [
  { id: 1, name: 'Alucard', role: 'Fighter', difficulty: 'Easy', wins: 120 },
  { id: 2, name: 'Gusion', role: 'Assassin', difficulty: 'Hard', wins: 200 },
  { id: 3, name: 'Layla', role: 'Marksman', difficulty: 'Easy', wins: 80 },
  { id: 4, name: 'Tigreal', role: 'Tank', difficulty: 'Medium', wins: 150 },
  { id: 5, name: 'Eudora', role: 'Mage', difficulty: 'Easy', wins: 95 },
  { id: 6, name: 'Chou', role: 'Fighter', difficulty: 'Hard', wins: 300 },
];

app.get('/api/characters', (req, res) => {
  res.json(characters);
});

app.get('/api/characters/:id', (req, res) => {
  const char = characters.find((c) => c.id == req.params.id);
  if (!char) return res.status(404).json({ message: 'Not found' });
  res.json(char);
});

app.post('/api/characters', (req, res) => {
  const newChar = {
    id: characters.length + 1,
    ...req.body,
  };
  characters.push(newChar);
  res.status(201).json(newChar);
});

app.put('/api/characters/:id', (req, res) => {
  const char = characters.find((c) => c.id == req.params.id);
  if (!char) return res.status(404).json({ message: 'Not found' });

  Object.assign(char, req.body);
  res.json(char);
});

app.delete('/api/characters/:id', (req, res) => {
  characters = characters.filter((c) => c.id != req.params.id);
  res.json({ message: 'Deleted' });
});

app.get('/api/characters/role/:role', (req, res) => {
  const result = characters.filter(
    (c) => c.role.toLowerCase() === req.params.role.toLowerCase()
  );
  res.json(result);
});

app.get('/api/search', (req, res) => {
  const name = req.query.name?.toLowerCase() || '';
  const result = characters.filter((c) => c.name.toLowerCase().includes(name));
  res.json(result);
});

app.get('/api/top-characters', (req, res) => {
  const sorted = [...characters].sort((a, b) => b.wins - a.wins);
  res.json(sorted.slice(0, 3));
});

app.get('/api/random', (req, res) => {
  const random = characters[Math.floor(Math.random() * characters.length)];
  res.json(random);
});

app.get('/api/stats', (req, res) => {
  const total = characters.length;
  const roles = {};

  characters.forEach((c) => {
    roles[c.role] = (roles[c.role] || 0) + 1;
  });

  res.json({ total, roles });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
