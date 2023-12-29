import { useState, useEffect } from 'react';
import Layout from '../../components/Layout.js';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';

export default function MyReviews() {
  const [reviews, setReviews] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editComment, setEditComment] = useState('');
  const [editRating, setEditRating] = useState(0);
  const supabase = useSupabaseClient();
  const user = useUser();

  useEffect(() => {
    if (user) {
      fetchReviews();
    }
  }, [user]);

  const fetchReviews = async () => {
    const { data: reviewsData, error } = await supabase
      .from('ratings')
      .select('id, commentaire, rating, id_film')
      .eq('email', user.email);

    if (error) {
      console.error('Error fetching reviews:', error);
      return;
    }

    const movieDetailsPromises = reviewsData.map((review) =>
      fetch(`http://www.omdbapi.com/?i=${review.id_film}&apikey=aadb27a`).then((res) => res.json())
    );
    const moviesDetails = await Promise.all(movieDetailsPromises);

    const reviewsWithMovies = reviewsData.map((review, index) => ({
      ...review,
      movie: moviesDetails[index],
    }));

    setReviews(reviewsWithMovies);
  };

  const handleEdit = (review, index) => {
    setEditingIndex(index);
    setEditComment(review.commentaire);
    setEditRating(review.rating);
  };

  const handleUpdate = async (reviewId) => {
    const { error } = await supabase
      .from('ratings')
      .update({ commentaire: editComment, rating: editRating })
      .eq('id', reviewId);

    if (error) {
      console.error('Error updating review:', error);
    } else {
      setEditingIndex(-1);
      fetchReviews();
    }
  };

  const handleDelete = async (reviewId) => {
    if (!confirm('Are you sure you want to delete this review?')) {
      return;
    }

    const { error } = await supabase
      .from('ratings')
      .delete()
      .eq('id', reviewId);

    if (error) {
      console.error('Error deleting review:', error);
    } else {
      const updatedReviews = reviews.filter((review) => review.id !== reviewId);
      setReviews(updatedReviews);
    }
  };

  const cancelEdit = () => {
    setEditingIndex(-1);
  };

  return (
    <Layout>
      <div className="bg-gradient-to-r from-yellow-500 via-yellow-700 to-yellow-900 text-white py-8 text-center">
        <h1 className="text-3xl font-semibold">My Reviews</h1>
      </div>

      <div className="container mx-auto p-4">
        <ul>
          {reviews.map((review, index) => (
            <li key={review.id} className="mt-8">
              {editingIndex === index ? (
                <div className="border rounded-lg p-4 shadow-md">
                  <input
      type="text"
      value={editComment}
      onChange={(e) => setEditComment(e.target.value)}
      className="border p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded-lg w-full" // Add w-full to make it wider
    />
    <div className="border p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded-lg mt-2 w-20"> {/* Add w-20 to make it narrower */}
      <input
        type="number"
        min="0"
        max="5"
        value={editRating}
        onChange={(e) => setEditRating(e.target.value)}
        className="w-full focus:outline-none" // Add w-full to fill the container
      />
    </div>
                  <button
                    onClick={() => handleUpdate(review.id)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 mt-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  >
                    Update
                  </button>
                  <button onClick={cancelEdit} className="ml-2 text-yellow-500 font-semibold hover:text-yellow-600 cursor-pointer">
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="border rounded-lg p-4 shadow-md">
                  <h3 className="text-3xl font-semibold">{review.movie.Title} ({review.movie.Year})</h3>
                  <img src={review.movie.Poster} alt={`Poster of ${review.movie.Title}`} className="mt-4 mb-2" />
                  <div className="comments-section mt-4">
                    <h3 className="text-lg font-semibold mb-2">Review:</h3>
                    <table className="w-full">
                      <tr>
                      <div className="comment border rounded-lg p-2 bg-gray-200 mt-2 max-w-md">
                          <p><strong>Rating :</strong> {review.rating}/5</p>
                      </div>
                      </tr>
                      <tr>
                      <div className="comment border rounded-lg p-2 bg-gray-200 mt-2 max-w-md">
                          <p><strong>Comment :</strong> {review.commentaire}</p>
                      </div>
                      </tr>
                    </table>
                  </div>
                  <button
                    onClick={() => handleEdit(review, index)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 mt-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  >
                    Edit Comment
                  </button>
                  <button
                    onClick={() => handleDelete(review.id)}
                    className="ml-2 text-red-500 font-semibold hover:text-red-600 cursor-pointer"
                  >
                    Delete Comment
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}