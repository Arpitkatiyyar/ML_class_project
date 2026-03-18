# Movie Recommender System

A full-stack movie recommendation project built with Python, Node.js, Express, and React. The app suggests similar movies using precomputed similarity data and enriches results with posters and genres from the TMDB API.

## Overview

This project combines:

- a Python recommendation engine based on preprocessed movie data
- an Express backend for search and recommendation APIs
- a React frontend for searching movies and displaying recommendations
- TMDB integration for posters and genre metadata

## Project Structure

```text
.
|-- main_movierecommendation.ipynb   # notebook used to build the recommendation model
|-- predict.py                       # simple local Python test script
|-- tmdb_5000_movies.csv             # source dataset
|-- tmdb_5000_credits.csv            # source dataset
|-- website/
|   |-- Backend/
|   |   |-- server.js                # Express API server
|   |   |-- movies.json              # movie title list used by search
|   |   `-- src/
|   |       |-- recommend.py         # Python recommendation script used by the API
|   |       |-- export_movies.py     # exports movie titles from movies.pkl to movies.json
|   |       |-- movies.pkl           # processed movie dataframe
|   |       |-- similarity.pkl       # similarity matrix
|   `-- frontend/
|       |-- src/App.jsx              # React UI
|       `-- package.json
```

## Features

- Search suggestions while typing a movie name
- Top 5 similar movie recommendations
- Poster and genre fetching from TMDB
- Separate frontend and backend structure for easier development

## Tech Stack

- Python
- Pandas / Pickle-based model artifacts
- Node.js + Express
- React + Vite
- TMDB API

## How It Works

1. The Python model loads `movies.pkl` and `similarity.pkl`.
2. When a movie is selected, the backend runs `website/Backend/src/recommend.py`.
3. The script returns the 5 most similar movies as JSON.
4. The backend fetches poster and genre details from TMDB.
5. The frontend displays the results in a card-style layout.

## Prerequisites

Make sure you have these installed:

- Python 3.x
- Node.js and npm
- Git LFS for `.pkl` files

Python packages used by the project include:

- `pandas`

## Setup

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd jupyter
```

### 2. Pull LFS files

If Git LFS is not set up, the `.pkl` files may not download correctly.

```bash
git lfs install
git lfs pull
```

### 3. Backend setup

```bash
cd website/Backend
npm install
```

Create a `.env` file inside `website/Backend`:

```env
TMDB_API_KEY=your_tmdb_api_key_here
```

Start the backend:

```bash
node server.js
```

The backend runs on:

```text
http://localhost:3000
```

### 4. Frontend setup

Open a new terminal:

```bash
cd website/frontend
npm install
npm run dev
```

The frontend runs on the Vite development server, usually:

```text
http://localhost:5173
```

## Important Note

The frontend in `website/frontend/src/App.jsx` currently uses a hardcoded backend IP address:

```js
http://10.241.129.90:3000
```

If you are running everything locally, change those API URLs to:

```js
http://localhost:3000
```

## API Endpoints

### `GET /search?q=<movie-name>`

Returns up to 10 matching movie titles from `movies.json`.

Example:

```text
GET http://localhost:3000/search?q=avatar
```

### `POST /recommend`

Request body:

```json
{
  "movie": "Avatar"
}
```

Response:

```json
[
  {
    "title": "Movie Title",
    "poster": "https://image.tmdb.org/t/p/w500/...",
    "genres": ["Action", "Adventure"]
  }
]
```

## Rebuilding Movie Title JSON

If `movies.pkl` changes, regenerate the searchable movie title list:

```bash
cd website/Backend/src
python export_movies.py
```

## Running the Python Script Directly

For quick local testing:

```bash
cd website/Backend/src
python recommend.py "Avatar"
```

Note: the backend calls this script automatically, so you usually do not need to run it manually.

## Current Limitations

- The frontend backend URL is hardcoded instead of using environment variables.
- There are no automated tests yet.
- Recommendation quality depends on the precomputed similarity matrix.

## Future Improvements

- Move frontend API URLs to environment variables
- Add loading and error states in the UI
- Add tests for backend routes
- Deploy frontend and backend separately

## License

This project is for learning and experimentation. Add a license here if you plan to publish or distribute it.
