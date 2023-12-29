import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Layout from '../components/Layout.js';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';

export default function Page() {
  const [movies, setMovies] = useState([]);
  const [comments, setComments] = useState([]);
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const router = useRouter();
  const supabase = useSupabaseClient();
  const user = useUser(); 

  const fetchMovie = async (title, year) => {
    console.log(`Title: ${title}, Year: ${year}`); // Log the title and year
    const response = await fetch(`/api/omdb?t=${encodeURIComponent(title)}&y=${encodeURIComponent(year)}`);
    const movieData = await response.json();

    if (response.ok) {
      setMovies([movieData]);
    } else {
      setMovies([]);
      // Handle errors appropriately
    }
  };

  const fetchComments = async (movieId) => {
    const { data, error } = await supabase
      .from('ratings')
      .select('commentaire, email, rating')
      .eq('id_film', movieId);

    if (error) {
      console.error('Error fetching comments:', error);
    } else {
      setComments(data);
    }
  };

  const addToWatchlist = async (movieId) => {
    if (!user) {
      alert('You must be logged in to add to your watchlist.');
      return;
    }

    const { error } = await supabase
      .from('watchlist')
      .insert([
        { email: user.email, id_film: movieId },
      ]);

    if (error) {
      alert(`Error adding to watchlist: ${error.message}`);
    } else {
      alert('Movie added to watchlist successfully!');
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
      pathname: '/movies',
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

    const { error } = await supabase
      .from('ratings')
      .insert([
        {
          email: user.email,
          commentaire: comment,
          rating: rating,
          id_film: movieId,
        },
      ]);

    if (error) {
      alert(`Error submitting rating: ${error.message}`);
    } else {
      setRating('');
      setComment('');
      setShowForm(false);
      alert('Rating submitted successfully!');
      fetchComments(movieId); // Refresh comments after submitting a new one
    }
  };

  return (
    <Layout>
      <Head>
        <title>Movie Search</title>
        <meta name="description" content="Search for movie information" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-3xl font-semibold text-center mt-8 mb-6 text-gray-800">
        Movie Search
      </h1>

      <form onSubmit={handleSubmit} className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Movie Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        <input
          type="text"
          placeholder="Release Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="border p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        <button
          type="submit"
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-r-lg p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        >
          Search
        </button>
      </form>

      {movies.map((movie) => (
        <div key={movie.imdbID} className="movie-details border rounded-lg p-4 shadow-md">
          <h2 className="text-xl font-bold"></h2>
          <button onClick={() => addToWatchlist(movie.imdbID)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add to Watchlist
          </button>
          <h2 className="text-3xl font-semibold">{movie.Title} ({movie.Year})</h2>
          <img src={movie.Poster} alt={`Poster of ${movie.Title}`} className="mt-2 mb-4" />
          <p><strong>Release Date:</strong> {movie.Released}</p>
          <p><strong>Synopsis:</strong> {movie.Plot}</p>
          <p><strong>Length:</strong> {movie.Runtime}</p>
          <p><strong>Genres:</strong> {movie.Genre}</p>

          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 mt-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            {showForm ? 'Cancel Rating' : 'Rate This Movie'}
          </button>

          {showForm && (
            <form onSubmit={handleRatingSubmit} className="mt-4">
              <label htmlFor="rating" className="block font-semibold">Rating (out of 5)</label>
              <input
                id="rating"
                type="number"
                min="0"
                max="5"
                name="rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                required
                className="border p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded-lg"
              />
              <label htmlFor="comment" className="block font-semibold mt-2">Comment</label>
              <textarea
                id="comment"
                name="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
                className="border p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded-lg"
              />
              <button
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 mt-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                Submit Rating
              </button>
            </form>
          )}

          {/* Section to display comments */}
          {comments.length > 0 && (
  <div className="comments-section mt-4">
    <h3 className="text-lg font-semibold mb-2">Comments :</h3>
    {comments.map((comment, index) => (
      <div
        key={index}
        className="comment border rounded-lg p-2 bg-gray-200 mt-2"
      >
        <p><strong>{comment.email}</strong>: {comment.commentaire} - Rating: {comment.rating}/5</p>
      </div>
    ))}
  </div>
)}

        </div>
      ))}
    </Layout>
  );
}