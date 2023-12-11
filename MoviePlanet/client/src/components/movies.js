import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Apikey from './apikey';
import defaultPoster from './../../src/questionmark.png'; // Tuodaan oletuskuva
import AddReviewPopUp from './addreview';

import '../movies.css'; // Ota huomioon polku tarvittaessa
import { UsernameSignal } from './signals';
import { useLocation } from 'react-router-dom';


const Movies = ({ tmdbApiKey }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [topMovies, setTopMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  /*________ARVOSTELUN LISÄYS________*/
  const [isReviewPopupOpen, setReviewPopupOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  /*_________HAKU_ETUSIVULTA__________*/
  const location = useLocation();



  /*________ARVOSTELUN LISÄYS________*/
  const openReviewPopup = (movie) => {
    if (movie && movie.title) {
      console.log('Painettu elokuvan nappia:', movie.title);
      console.log('mun nimi on:' + UsernameSignal.value);
      setReviewPopupOpen(true);
      setSelectedMovie(movie);
    } else {
      console.error('Elokuvan tiedoissa puuttuu otsikko tai elokuva on undefined.');

    }
  };

  const closeReviewPopup = () => {
    setReviewPopupOpen(false);
  };

  const submitReview = (stars, reviewText) => {
    // Tässä voit tehdä mitä haluat stars- ja reviewText-arvoilla
    console.log('Tähdet:', stars);
    console.log('Arvostelu:', reviewText);
    console.log('Elokuvan nimi:', selectedMovie.id);
  };
  /*____________________*/

  /*_________API_HAUT___________*/

  useEffect(() => {
    axios
      .get('https://api.themoviedb.org/3/trending/movie/week', {
        params: {
          api_key: tmdbApiKey,
        },
      })
      .then(response => setTopMovies(response.data.results))
      .catch(error => console.error('Virhe top-elokuvien hakemisessa:', error));

  }, [tmdbApiKey]);


  useEffect(() => {
    console.log('useEffect in Movies.js is running');
    const searchTermFromLocationState = location.state?.searchTerm; //jos location.state.searchTerm on määritetty, aseta se searchTermFromLocationState muuttujaan
    
    if (searchTermFromLocationState) { // Jos hakusana on määritetty, päivitä tila
      setSearchTerm(searchTermFromLocationState);
    }

    const fetchMovies = async () => {
      try {
        if (searchTerm.trim() !== '') { // jos hakusana ei ole tyhjä, tee haku
          console.log('API-pyyntö lähetetty hakutermillä:', searchTerm);
          const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
            params: {
              api_key: tmdbApiKey,
              query: searchTerm,
            },
          });

          console.log('Fetched movies ETUSIVU:', response.data.results);
          setSearchResults(response.data.results.slice(0, 20));
        }
      } catch (error) {
        console.error('Virhe elokuvien hakemisessa:', error);
      }
    };
    console.log('searchTerm on /movies:', searchTermFromLocationState);
    fetchMovies();
  }, [searchTerm, tmdbApiKey, location]);

  return (
    <div className="movies-container">
      <h1>Elokuvien hakeminen</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Hae elokuvia"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="movies-input"
        />
      </div>

      <div className="movies-grid">
        {searchResults.map((movie, index) => (
          <div key={movie.id} className="movie-item">
            <img
              src={movie.poster_path ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` : defaultPoster}
              alt={movie.title}
              className="movie-poster"
              onError={(e) => {
                e.target.src = defaultPoster; // Vaihda kuva oletuskuvaan, jos lataaminen epäonnistuu
              }}
            />
            <h2 className="movie-title">{movie.title}</h2>
            {/* Arvostelunappi */}
            <button
              className='lisaaArvosteluBtn'
              onClick={() => {
                if (UsernameSignal.value.trim() === '') {
                  alert("Sinun täytyy kirjautua sisään ensin.");
                } else {
                  openReviewPopup(movie);
                }
              }}
              title={`Arvioi ${movie.title}`}
            >
              <img src='/pictures/feedback-hand.png' id="searchBtnImg" alt={`Arvioi ${movie.title}`} />
            </button>
            {isReviewPopupOpen && (
              <AddReviewPopUp movie={selectedMovie} onClose={closeReviewPopup} onSubmit={submitReview} />
            )}
            {/* Arvostelunappi loppu */}
          </div>
        ))}
      </div>

      {!searchTerm && (
        <>
          <h1>Tämän hetkiset viikon villitykset</h1>
          <div className="movies-grid">
            {topMovies.map((movie, index) => (
              <div key={movie.id} className="movie-item">
                <img
                  src={movie.poster_path ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` : defaultPoster}
                  alt={movie.title}
                  className="movie-poster"
                  onError={(e) => {
                    e.target.src = defaultPoster;
                  }}
                />
                <h2 className="movie-title">{movie.title}</h2>
                {/* Arvostelunappi */}
                <button
                  className='lisaaArvosteluBtn'
                  onClick={() => {
                    if (UsernameSignal.value.trim() === '') {
                      alert("Sinun täytyy kirjautua sisään ensin.");
                    } else {
                      openReviewPopup(movie);
                    }
                  }}
                  title={`Arvioi ${movie.title}`}
                >
                  <img src='/pictures/feedback-hand.png' id="searchBtnImg" alt={`Arvioi ${movie.title}`} />
                </button>
                {isReviewPopupOpen && (
                  <AddReviewPopUp movie={selectedMovie} onClose={closeReviewPopup} onSubmit={submitReview} />
                )}
                {/* Arvostelunappi loppu */}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const MoviesWithApiKey = () => (
  <Apikey>
    {({ tmdbApiKey }) => <Movies tmdbApiKey={tmdbApiKey} />}
  </Apikey>
);

export default MoviesWithApiKey;
