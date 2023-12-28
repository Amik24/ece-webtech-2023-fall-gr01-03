import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Layout from '../components/Layout.js';

export default function Page() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const router = useRouter();

  // Function to fetch movies
  const fetchMovie = async (title, year) => {
    let apiUrl = `http://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=aadb27a`;
    if (year) {
      apiUrl += `&y=${encodeURIComponent(year)}`;
    }

    const response = await fetch(apiUrl);
    const movieData = await response.json();

    if (movieData.Response === "True") {
      setMovies([movieData]);
    } else {
      setMovies([]);
    }
  };

  // Fetch movie data based on query parameters
  useEffect(() => {
    if (router.isReady) {
      const { t, y } = router.query;

      setTitle(t || '');
      setYear(y || '');

      if (t) {
        fetchMovie(t, y);
      }
    }
  }, [router.isReady, router.query]);

  // Update URL query parameters without reloading the page
  const updateQueryParams = (newTitle, newYear) => {
    const query = {};
    if (newTitle) query.t = newTitle;
    if (newYear) query.y = newYear;
    router.push({
      pathname: '/articles',
      query: query,
    }, undefined, { shallow: true });
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    updateQueryParams(title, year);
  };

  return (
    <Layout>
      <Head>
        <title>Movie Search</title>
        <meta name="description" content="Search for movie information" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="wt-title">Movie Search</h1>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Movie Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Release Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <ul className='italic font-bold'>
        {movies.map(movie => (
          <li key={movie.imdbID}>
            <h2>{movie.Title}</h2>
            <img src={movie.Poster} alt={`Poster of ${movie.Title}`} className="w-64 h-96 object-cover" />
            <p>Release Date: {movie.Released}</p>
            <p>Synopsis: {movie.Plot}</p>
            <p>Length: {movie.Runtime}</p>
            <p>Genres: {movie.Genre}</p>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
