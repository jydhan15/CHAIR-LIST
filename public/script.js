const API = '/api';

// display
function display(data) {
  const list = document.getElementById('list');
  list.innerHTML = '';

  if (!data || data.length === 0) {
    list.innerHTML = '<p>No results</p>';
    return;
  }

  data.forEach((c) => {
    list.innerHTML += `
      <div class="card">
        <h3>${c.name}</h3>
        <p>${c.role} | ${c.difficulty}</p>
        <p>Wins: ${c.wins}</p>
      </div>
    `;
  });
}

// load all
async function loadAll() {
  const res = await fetch(`${API}/characters`);
  const data = await res.json();
  display(data);
}

// search
async function search() {
  const value = document.getElementById('search').value;

  const res = await fetch(`${API}/search?name=${value}`);
  const data = await res.json();
  display(data);
}

// top
async function loadTop() {
  const res = await fetch(`${API}/top-characters`);
  const data = await res.json();
  display(data);
}

// random
async function loadRandom() {
  const res = await fetch(`${API}/random`);
  const data = await res.json();
  display([data]);
}

loadAll();
