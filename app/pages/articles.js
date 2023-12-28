import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Layout from '../components/Layout.js';

export default function Page() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
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

  // Handle form submission for movie search
  const handleSubmit = (event) => {
    event.preventDefault();
    updateQueryParams(title, year);
  };

  // Handle rating and comment form submission
  const handleRatingSubmit = (event) => {
    event.preventDefault();
    // Here, add your logic to handle the rating and comment submission
    // For now, we'll just log it to the console
    console.log("Rating:", rating, "Comment:", comment);
    // Reset the form
    setRating('');
    setComment('');
    setShowForm(false);
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

            <button onClick={() => setShowForm(!showForm)} className="rounded-full bg-blue-200 text-blue-800 font-bold py-2 px-4 mt-4">
              {showForm ? 'Cancel Rating' : 'Rate This Movie'}
            </button>

            {showForm && (
              <form onSubmit={handleRatingSubmit} className="block mt-4">
                <label htmlFor="rating">
                  Rating (out of 5)
                  <input id="rating" type="number" min="0" max="5" name="rating" value={rating} onChange={(e) => setRating(e.target.value)} required />
                </label>
                <label htmlFor="comment">
                  Comment
                  <textarea id="comment" name="comment" value={comment} onChange={(e) => setComment(e.target.value)} required />
                </label>
                <button type="submit" className="rounded-full bg-blue-200 text-blue-800 font-bold py-2 px-4 mt-2">
                  Submit Rating
                </button>
              </form>
            )}
          </li>
        ))}
      </ul>
    </Layout>
  );
}
