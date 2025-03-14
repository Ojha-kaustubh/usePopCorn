import { useState } from "react";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) => arr.reduce((acc, cur) => acc + cur, 0) / arr.length;

export default function App() {
  return (
    <>
      <Navbar />
      <div className="main">
        <MovieList movies={tempMovieData} />
        <WatchedSummary watched={tempWatchedData} />
        <WatchedList watched={tempWatchedData} />
      </div>
    </>
  );
}

function Navbar() {
  const [searchResults, setSearchResults] = useState("");

  return (
    <nav className="nav-bar">
      <div className="logo">
        <span className="img">🍿</span>
        <h1>usePopcorn</h1>
      </div>

      <input
        type="text"
        className="search"
        placeholder="Search Movies..."
        value={searchResults}
        onChange={(e) => setSearchResults(e.target.value)}
      />
      <p className="num-results">
        Found <strong>3</strong> Results
      </p>
    </nav>
  );
}

function MovieList({ movies }) {
  return (
    <div className="list">
      {movies.map((movie) => (
        <MovieItem key={movie.imdbID} movie={movie} />
      ))}
    </div>
  );
}

function MovieItem({ movie }) {
  return (
    <>
      <li>
        <img src={movie.Poster} alt={`${movie.Title} poster`} />
        <h3>{movie.Title}</h3>
        <p>
          <span>🗓</span>
          {movie.Year}
        </p>
      </li>
    </>
  );
}

function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you Watched</h2>
      <p>
        <span>#️⃣</span>
        {watched.length} movies watched
      </p>

      <p>
        <span>⭐️</span> {avgImdbRating.toFixed(1)} average IMDb rating
      </p>

      <p>
        <span>🌟</span> {avgUserRating.toFixed(1)} average rating
      </p>

      <p>
        <span>⏳</span> {avgRuntime.toFixed(1)} average runtime
      </p>
    </div>
  );
}

function WatchedList({ watched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovieList key={movie.imdbID} movie={movie} />
      ))}
    </ul>
  );
}

function WatchedMovieList({ movie }) {
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <p>
        <span>⭐️</span> {movie.imdbRating} IMDb Rating
      </p>

      <p>
        <span>🌟</span> {movie.userRating} User Rating
      </p>

      <p>
        <span>⏳</span> {movie.runtime} minutes
      </p>
    </li>
  );
}
