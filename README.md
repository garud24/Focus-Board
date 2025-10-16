# Focus-Board

A tiny, API-powered personal dashboard to practice modern HTML, CSS, and JavaScript—no frameworks, no build tools, no API keys. You’ll learn semantic HTML, responsive layout, fetch + async/await, error handling, and localStorage.

## ✨ Features

Quote Card — random quotes via Quotable API

Weather Card — city → geocode → current weather via Open-Meteo

GitHub Lookup — fetch user avatar & stats (public API)

To-Do List — add/complete/clear tasks (persisted in localStorage)

Theme Toggle — dark/light via CSS variables (:root / .light)

## 🧱 Architecture

Layered, modular design:

UI Layer (HTML/CSS)

index.html — semantic structure (header / main / footer, cards)

css/styles.css — mobile-first grid, card styles, theme variables

App Wiring (JS entry)

js/app.js — event listeners, renders, state wiring

Service Layer (API modules)

js/api/quotes.js — getRandomQuote()

js/api/weather.js — fetchWeatherByCity(city) (calls geocode + forecast)

js/api/github.js — fetchGitHubUser(username)

State/Storage Layer

js/storage/todos.js — CRUD helpers on top of localStorage

Theme preference also saved to localStorage

Component/Module Diagram
flowchart TB
  subgraph UI["UI Layer (HTML/CSS)"]
    Header["Header (title, theme toggle)"]
    QuoteCard["Quote Card"]
    WeatherCard["Weather Card"]
    GithubCard["GitHub Card"]
    TodoCard["To-Do Card"]
    Footer["Footer"]
  end

  subgraph APP["App Entry (js/app.js)"]
    Renderers["DOM listeners & renderers"]
    ThemeMgr["Theme manager (localStorage)"]
  end

  subgraph API["Service Layer (js/api)"]
    QAPI["quotes.js\ngetRandomQuote()"]
    WAPI["weather.js\nfetchWeatherByCity()"]
    GHAPI["github.js\nfetchGitHubUser()"]
  end

  subgraph STORAGE["State/Storage (js/storage)"]
    Todos["todos.js\nload/add/toggle/clear"]
  end

  UI <--> APP
  APP --> QAPI
  APP --> WAPI
  APP --> GHAPI
  APP <--> STORAGE

## 📁 Folder Structure
focusboard/
├─ index.html
├─ css/
│  └─ styles.css
├─ js/
│  ├─ app.js
│  ├─ api/
│  │  ├─ quotes.js
│  │  ├─ weather.js
│  │  └─ github.js
│  └─ storage/
│     └─ todos.js
└─ assets/              # optional icons/images

## 🚀 Getting Started
Prerequisites

A web browser (Chrome/Firefox/Edge/Safari)

Recommended: VS Code with the Live Server extension (or any static server)

Run Locally

Clone/download this repo.

Open the folder in VS Code.

Start a local server (preferred):

With Live Server: right-click index.html → Open with Live Server

Or use any static server (e.g., python -m http.server in the project root)

Visit the local URL (e.g., http://127.0.0.1:5500/).

You can open index.html directly via file://, but some browsers restrict fetch or localStorage in that mode. A local server avoids surprises.

## 🕹️ Usage

Theme: Click the 🌗 button to toggle dark/light. Preference is saved.

Quote: Click New Quote to fetch a fresh quote.

Weather: Enter a city (e.g., London) → Get Weather.
Shows current temperature (°C) and a short description.

GitHub: Enter a username (e.g., octocat) → Search.
Displays avatar, profile link, followers, and repo count.

To-Do:

Type a task → Add

Toggle a task’s checkbox to complete

Clear completed removes all finished tasks

Tasks persist across page reloads

## 🔌 APIs Used (no keys required)

Quotable — GET https://api.quotable.io/random

Open-Meteo Geocoding —
GET https://geocoding-api.open-meteo.com/v1/search?name={city}&count=1

Open-Meteo Forecast —
GET https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current_weather=true

GitHub Users —
GET https://api.github.com/users/{username}

🧩 How It Works (brief)

Theme: toggles .light class on <html> and stores theme in localStorage.

Fetching: app.js calls service functions; each module:

fetch the endpoint

check res.ok and throw errors if needed

return res.json() or a UI-ready object (mapped/cleaned)

To-Dos: todos.js is the only code touching localStorage; app.js renders from it.

📦 Deployment (GitHub Pages)

Push your code to GitHub.

In your repo: Settings → Pages

Source: “Deploy from a branch”

Branch: main (root) → Save

Your site will be available at
https://<your-username>.github.io/<your-repo>/

🛠️ Troubleshooting

Nothing works / blank page
Open DevTools → Console. Fix any red errors (usually a typo or wrong path).

Theme button doesn’t toggle
Ensure the button has id="theme-toggle" and your script tag is
<script type="module" src="js/app.js"></script> at the end of body.

GitHub/Weather/Quote fail
Check DevTools → Network to see request status. If 4xx/5xx, your UI should show a friendly error.

To-dos don’t persist
Run via a local server; some browsers limit storage on file://.

Styles not applied
Confirm the path <link rel="stylesheet" href="css/styles.css" /> and the file actually lives at css/styles.css.