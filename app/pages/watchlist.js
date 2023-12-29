import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';

export default function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);
  const supabase = useSupabaseClient();
  const user = useUser();

  useEffect(() => {
    if (user) {
      fetchWatchlist();
    }
  }, [user]);

  const fetchWatchlist = async () => {
    const { data: watchlistData, error } = await supabase
      .from('watchlist')
      .select('*')
      .eq('email', user.email);

    if (error) {
      console.error('Error fetching watchlist:', error);
      return;
    }

    const movieDetailsPromises = watchlistData.map((entry) => {
      return fetch(`/api/omdb?i=${entry.id_film}`).then((res) => res.json());
    });

    const moviesDetails = await Promise.all(movieDetailsPromises);
    // Combine the movie details with the id_film from your watchlist data
    const combinedData = moviesDetails.map((details, index) => ({
      ...details,
      id_film: watchlistData[index].id_film,
    }));
    setWatchlist(combinedData);
  };

  const handleDelete = async (id_film) => {
    const { error } = await supabase
      .from('watchlist')
      .delete()
      .eq('id_film', id_film)
      .eq('email', user.email);

    if (error) {
      console.error('Error deleting movie from watchlist:', error);
    } else {
      // Remove the movie from the local state as well
      const updatedWatchlist = watchlist.filter(movie => movie.id_film !== id_film);
      setWatchlist(updatedWatchlist);
      alert('Movie removed from watchlist');
    }
  };

  return (
    <Layout>
      <h1 className="text-3xl font-semibold text-center my-6">My Watchlist</h1>
      <div className="container mx-auto p-4">
        {watchlist.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {watchlist.map((movie) => (
              <div key={movie.id_film} className="max-w-sm rounded overflow-hidden shadow-lg">
                <img src={movie.Poster} alt={`Poster of ${movie.Title}`} className="w-full" />
                <div className="px-6 py-4">
                  <p><strong>Release Date:</strong> {movie.Released}</p>
                  <p><strong>Synopsis:</strong> {movie.Plot}</p>
                  <p><strong>Length:</strong> {movie.Runtime}</p>
                  <p><strong>Genres:</strong> {movie.Genre}</p>
                  <button 
                    onClick={() => handleDelete(movie.id_film)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">Your watchlist is empty.</p>
        )}
      </div>
    </Layout>
  );
}
