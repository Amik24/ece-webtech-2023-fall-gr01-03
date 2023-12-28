import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Layout from '../components/Layout.js';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';

export default function Page() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const router = useRouter();
  const supabase = useSupabaseClient();
  const user  = useUser(); // This hook provides the authenticated user's information

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

  const updateQueryParams = (newTitle, newYear) => {
    const query = {};
    if (newTitle) query.t = newTitle;
    if (newYear) query.y = newYear;
    router.push({
      pathname: '/articles',
      query: query,
    }, undefined, { shallow: true });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchMovie(title, year);
    updateQueryParams(title, year);
  };

  const handleRatingSubmit = async (event) => {
    event.preventDefault();
    if (!user) {
      alert('You must be logged in to submit a rating.');
      return;
    }

    const movieId = movies.length > 0 ? movies[0].imdbID : null;
    if (!movieId) {
      alert('No movie selected for rating.');
      return;
    }

    const { data, error } = await supabase
      .from('ratings')
      .insert([
        {
          email: user.email, // user's email from authentication
          commentaire: comment, // the comment from the form
          rating: rating, // the rating from the form
          id_film: movieId, // the movie's ID
        },
      ]);

    if (error) {
      alert(`Error submitting rating: ${error.message}`);
    } else {
      setRating('');
      setComment('');
      setShowForm(false);
      alert('Rating submitted successfully!');
    }
  };

  return (
    <Layout>
      <Head>
        <title>Movie Search</title>
        <meta name="description" content="Search for movie information" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="wt-title">Movie Search</h1>

      <form onSubmit={handleSubmit} className="search-form">
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

      {movies.map((movie) => (
        <div key={movie.imdbID} className="movie-details">
          <h2>{movie.Title} ({movie.Year})</h2>
          <img src={movie.Poster} alt={`Poster of ${movie.Title}`} />
          <p>Release Date: {movie.Released}</p>
          <p>Synopsis: {movie.Plot}</p>
          <p>Length: {movie.Runtime}</p>
          <p>Genres: {movie.Genre}</p>

          <button onClick={() => setShowForm(!showForm)} className="rate-movie-button">
            {showForm ? 'Cancel Rating' : 'Rate This Movie'}
          </button>

          {showForm && (
            <form onSubmit={handleRatingSubmit} className="rating-form">
              <label htmlFor="rating">
                Rating (out of 5)
                <input
                  id="rating"
                  type="number"
                  min="0"
                  max="5"
                  name="rating"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  required
                />
              </label>
              <label htmlFor="comment">
                Comment
                <textarea
                  id="comment"
                  name="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                />
              </label>
              <button type="submit" className="submit-rating-button">
                Submit Rating
              </button>
            </form>
          )}
        </div>
      ))}
      {user && <p>Email: {user.email}</p>}
    </Layout>
  );
}
