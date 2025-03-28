import { useEffect, useState } from "react";

const KEY = "aaa8e77";

export function useMovies({ query }) {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
          );
          const data = await res.json();
          if (!res.ok) throw new Error("Something went wrong");
          if (data.Response === "False")
            throw new Error("Sometimes wrong with movie fetching");
          console.log(data.Search);
          setMovies(data.Search);
          // .then((res) => res.json())
          // .then((data) => console.log(data.Search));
          console.log(movies);
        } catch (error) {
          console.error(error.message);
          setError(error.message);
          // if(error.name ! == 'AbortError') {
          //   setError(error.message);
          // }
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query]
  );
  return { movies, isLoading, error };
}
