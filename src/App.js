import { useEffect, useState } from "react";

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

const KEY = "aaa8e77";

// this are the props drillings
export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(function () {
    async function fetchMovies() {
      const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=matrix`);
      const data = await res.json();
      setMovies(data.Search);
      // .then((res) => res.json())
      // .then((data) => console.log(data.Search));
      console.log(data.Search);
      setIsLoading(false);
    }
    fetchMovies();
  }, []);

  return (
    <>
      <Navbar>
        <Logo />
        <Search />
        <NumResults movies={movies} />
      </Navbar>

      <Main>
        <Box>
          {isLoading ? <Loader /> : <MovieList movies={movies} />} 
          </Box>

        <Box>
          {/* <WatchedSummary watched={watched} /> */}
          <WatchedBox watched={watched} />
        </Box>
      </Main>
    </>
  );
}

function Loader() {
  return (
    <p className="loader">Loading...</p>
  )
}

function Navbar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function Search() {
  const [query, setQuery] = useState("");
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}
function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((show) => !show)}>
        {isOpen ? "-" : "+"}
      </button>

      {isOpen && children}
    </div>
  );
}

function MovieList({ movies }) {
  return (
    <ul className="list">
      {movies.map((movie) => (
        <Movie key={movie.imdbID} movie={movie} />
      ))}
    </ul>
  );
}

function Movie({ movie }) {
  return (
    <li>
      <img src={movie.Poster} alt={"poster"} />
      <h3>{movie.Title}</h3>

      <div>
        <p>
          <span>🗓</span> {movie.Year}
        </p>
      </div>
    </li>
  );
}

function WatchedBox() {
  const [isOpen2, setIsOpen2] = useState(true);
  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen2((show) => !show)}
      >
        {isOpen2 ? "-" : "+"}
      </button>

      {isOpen2 && (
        <>
          <WatchedSummary watched={tempWatchedData} />
          <WatchedList watched={tempWatchedData} />
        </>
      )}
    </div>
  );
}

function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies You Watched</h2>

      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>

        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(1)}</span>
        </p>

        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(1)}</span>
        </p>

        <p>
          <span>⏳</span>
          <span>{avgRuntime.toFixed(1)}</span>
        </p>
      </div>
    </div>
  );
}

function WatchedList({ watched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovieItem key={movie.imdbID} movie={movie} />
      ))}
    </ul>
  );
}

function WatchedMovieItem({ movie }) {
  return (
    <li>
      <img src={movie.Poster} alt="poster" />
      <h3>{movie.Title}</h3>

      <div>
        <p>
          <span>⭐</span>
          <span>{movie.imdbRating}</span>
        </p>

        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>

        <p>
          <span>⏳</span>
          <span>{movie.runtime}</span>
        </p>
      </div>
    </li>
  );
}
