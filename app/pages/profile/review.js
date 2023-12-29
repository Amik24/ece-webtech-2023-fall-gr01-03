import { useState, useEffect } from 'react';
import Layout from '../../components/Layout.js';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';

export default function MyReviews() {
  const [reviews, setReviews] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editComment, setEditComment] = useState('');
  const [editRating, setEditRating] = useState(0);
  const supabase = useSupabaseClient();
  const user = useUser(); // Assuming useUser hook provides user details

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
      setEditingIndex(-1); // Exit editing mode
      fetchReviews(); // Re-fetch reviews after updating
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
      setReviews(updatedReviews); // Update the reviews state
    }
  };

  const cancelEdit = () => {
    setEditingIndex(-1);
  };

  return (
    <Layout>
      <h1>My Reviews</h1>
      <ul>
        {reviews.map((review, index) => (
          <li key={review.id}>
            {editingIndex === index ? (
              <div>
                <input
                  type="text"
                  value={editComment}
                  onChange={(e) => setEditComment(e.target.value)}
                />
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={editRating}
                  onChange={(e) => setEditRating(e.target.value)}
                />
                <button onClick={() => handleUpdate(review.id)}>Update</button>
                <button onClick={cancelEdit}>Cancel</button>
              </div>
            ) : (
              <div>
                <h3>{review.movie.Title} ({review.movie.Year})</h3>
                <img src={review.movie.Poster} alt={`Poster of ${review.movie.Title}`} />
                <p>Rating: {review.rating}</p>
                <p>Comment: {review.commentaire}</p>
                <button onClick={() => handleEdit(review, index)}>Edit Comment</button><br></br>
                <button onClick={() => handleDelete(review.id)}>Delete Comment</button>
              </div>
            )}
          </li>
        ))}
      </ul>
      {user && <p>User Email: {user.email}</p>}
    </Layout>
  );
}
