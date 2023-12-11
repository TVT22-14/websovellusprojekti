import React, { useState, useEffect } from 'react';
import Apikey from './apikey';
import axios from 'axios';
import '../review.css';

function AllReviews() {
  return (
    <div>
      <h1>Arvostelut</h1>
      <Review />
    </div>
  )
};

function Reviews({ tmdbApiKey }) {
  const [review, setReviews] = useState([]);
  const [movieData, setMovieData] = useState([]);
  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {

        const response = await axios.get('http://localhost:3001/review/allmoviereviews');
        setReviews(response.data);

        const movieDataPromises = response.data.map(async (review) => {
          const movieResponse = await axios.get(`https://api.themoviedb.org/3/movie/${review.movieidapi}`, {
            params: {
              api_key: tmdbApiKey,
            },
          });
          return movieResponse.data;
        });

        const movies = await Promise.all(movieDataPromises);
        setMovieData(movies);

        const userDetailsPromises = response.data.map(async (review) => {
          const userResponse = await axios.get('http://localhost:3001/customer/getUser/?idcustomer=' + review.idcustomer);
          return userResponse.data[0];
        });

        const users = await Promise.all(userDetailsPromises);
        setUserDetails(users);    

      } catch (error) {
        console.error('Virhe haettaessa arvosteluja tai elokuvatietoja:', error);
      }
      
    };
    fetchReviews();
  }, [tmdbApiKey]);

  return (
    <div id='reviews'>
      {review.map((review, index) => (
        <div id='review' key={review.idreview}>
          {movieData[index] && userDetails[index] && (
            <div key={movieData[index].id}>
              <img id='posteri' src={`https://image.tmdb.org/t/p/w500/${movieData[index]?.poster_path}`} alt='Movie Poster' />
              <p>{movieData[index]?.title}</p>
              <p>{convertToStars(review.moviestars)}</p>
              <p>{'"'+review.review+'"'}</p>
              <p>{'-'+userDetails[index]?.username}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function convertToStars(moviestars) {
  const maxStars = 5;
  const fullStar = '★';
  const emptyStar = '☆';

  // Tarkistetaan, että moviestars on välillä 0-5
  const clampedStars = Math.min(Math.max(0, moviestars), maxStars);

  const fullStarsCount = Math.floor(clampedStars);
  const emptyStarsCount = maxStars - fullStarsCount;

  const stars = fullStar.repeat(fullStarsCount) + emptyStar.repeat(emptyStarsCount);

  return stars;
}

function Review() {
  return (
    <Apikey>
      {({ tmdbApiKey }) => <Reviews tmdbApiKey={tmdbApiKey} />}
    </Apikey>
  );
}

export default AllReviews;