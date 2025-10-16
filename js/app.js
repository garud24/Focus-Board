import { getRandomQuote } from './api/quotes.js';
import { fetchWeatherByCity } from './api/weather.js';
import { fetchGitHubUser } from './api/github.js';
import { loadTodos, addTodo, toggleTodo, clearCompleted } from './storage/todos.js';

/* THEME */
const root = document.documentElement;
const themeBtn = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'light') root.classList.add('light');
themeBtn.setAttribute('aria-pressed', savedTheme === 'light');
themeBtn.addEventListener('click', () => {
  root.classList.toggle('light');
  const isLight = root.classList.contains('light');
  themeBtn.setAttribute('aria-pressed', isLight);
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

/* QUOTE */
const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
async function renderQuote() {
  quoteText.textContent = 'Loading...';
  quoteAuthor.textContent = '';
  try {
    const q = await getRandomQuote();
    quoteText.textContent = q.content;
    quoteAuthor.textContent = `— ${q.author ?? 'Unknown'}`;
  } catch {
    quoteText.textContent = 'Failed to load quote.';
  }
}
document.getElementById('new-quote-btn').addEventListener('click', renderQuote);
renderQuote(); // initial load

/* WEATHER */
const weatherForm   = document.getElementById('weather-form');
const cityInput     = document.getElementById('city-input');
const weatherResult = document.getElementById('weather-result');
weatherForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  weatherResult.textContent = 'Fetching…';
  try {
    const data = await fetchWeatherByCity(cityInput.value.trim());
    weatherResult.innerHTML = `
      <div>
        <strong>${data.name}</strong><br/>
        ${Math.round(data.temp)}°C, ${data.description}
      </div>`;
  } catch (err) {
    weatherResult.textContent = err.message || 'Could not fetch weather';
  }
});

/* GITHUB */
const ghForm = document.getElementById('gh-form');
const ghInput = document.getElementById('gh-user');
const ghResult = document.getElementById('gh-result');
ghForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  ghResult.textContent = 'Loading…';
  try {
    const u = await fetchGitHubUser(ghInput.value.trim());
    ghResult.innerHTML = `
      <div style="display:flex;gap:.75rem;align-items:center">
        <img src="${u.avatar_url}" alt="" width="48" height="48" style="border-radius:50%"/>
        <div>
          <a href="${u.html_url}" target="_blank" rel="noopener">${u.login}</a><br/>
          <span class="muted">${u.followers} followers • ${u.public_repos} repos</span>
        </div>
      </div>`;
  } catch {
    ghResult.textContent = 'User not found.';
  }
});

/* TODOS */
const todoForm  = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList  = document.getElementById('todo-list');
const clearBtn  = document.getElementById('clear-done');

function renderTodos() {
  const todos = loadTodos();
  todoList.innerHTML = '';
  todos.forEach((t, idx) => {
    const li = document.createElement('li');
    li.className = t.done ? 'completed' : '';
    const cb = document.createElement('input');
    cb.type = 'checkbox'; cb.checked = t.done;
    cb.addEventListener('change', () => { toggleTodo(idx); renderTodos(); });
    const span = document.createElement('span');
    span.textContent = t.text;
    li.append(cb, span);
    todoList.appendChild(li);
  });
}

todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = todoInput.value.trim();
  if (!text) return;
  addTodo(text);
  todoInput.value = '';
  renderTodos();
});
clearBtn.addEventListener('click', () => { clearCompleted(); renderTodos(); });

renderTodos();
