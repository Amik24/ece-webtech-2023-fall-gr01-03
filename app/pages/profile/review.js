import { useState, useEffect } from 'react';
import Layout from '../../components/Layout.js';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';

export default function MyReviews() {
  const [reviews, setReviews] = useState([]);
  const supabase = useSupabaseClient();
  const user  = useUser(); // This will be used to fetch reviews and display user email

  useEffect(() => {
    if (user) {
      fetchReviews();
    }
  }, [user]);

  const fetchReviews = async () => {
    const { data: reviewsData, error } = await supabase
      .from('ratings')
      .select('commentaire, rating, id_film')
      .eq('email', user.email);

    if (error) {
      console.error('Error fetching reviews:', error);
      return;
    }

    // Fetch movie details for each review
    const movieDetailsPromises = reviewsData.map((review) =>
      fetch(`http://www.omdbapi.com/?i=${review.id_film}&apikey=aadb27a`).then((res) => res.json())
    );
    const moviesDetails = await Promise.all(movieDetailsPromises);

    // Combine movie details with reviews
    const reviewsWithMovies = reviewsData.map((review, index) => ({
      ...review,
      movie: moviesDetails[index],
    }));

    setReviews(reviewsWithMovies);
  };

  return (
    <Layout>
      <h1>My Reviews</h1>
      <ul>
        {reviews.map((review, index) => (
          <li key={index}>
            <h3>{review.movie.Title} ({review.movie.Year})</h3>
            <img src={review.movie.Poster} alt={`Poster of ${review.movie.Title}`} />
            <p>Rating: {review.rating}</p>
            <p>Comment: {review.commentaire}</p>
          </li>
        ))}
      </ul>
      {user && <p>User Email: {user.email}</p>}
    </Layout>
  );
}
