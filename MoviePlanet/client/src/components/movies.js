import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Apikey from './apikey';
import defaultPoster from './../../src/questionmark.png';
import '../movies.css';

const Movies = ({ tmdbApiKey }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  console.log('API key:', tmdbApiKey);
  console.log('Search term:', searchTerm);
  console.log('Selected genres:', selectedGenres);

  useEffect(() => {
    axios
      .get('https://api.themoviedb.org/3/genre/movie/list', {
        params: {
          api_key: tmdbApiKey,
        },
      })
      .then(response => {
        // Voit käsitellä genrejä tässä, jos tarpeen
      })
      .catch(error => console.error('Virhe genrien hakemisessa:', error.response || error.message));
  }, [tmdbApiKey]);

  useEffect(() => {
    axios
      .get('https://api.themoviedb.org/3/trending/movie/week', {
        params: {
          api_key: tmdbApiKey,
        },
      })
      .then(response => setTopMovies(response.data.results))
      .catch(error => console.error('Virhe top-elokuvien hakemisessa:', error.response || error.message));
  }, [tmdbApiKey]);

  useEffect(() => {
    const fetchMovies = async () => {
      const currentSearchTerm = searchTerm;
  
      try {
        let response;
  
        if (currentSearchTerm.trim() === '' && selectedGenres.length > 0) {
          // If no search term but there are selected genres, fetch top-rated movies for those genres
          response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
            params: {
              api_key: tmdbApiKey,
              with_genres: selectedGenres.join(','), // Comma-separated genre IDs
              sort_by: 'popularity.desc', // Sort by vote average in descending order
            },
          });
        } else {
          // Fetch movies based on search term and selected genres
          response = await axios.get('https://api.themoviedb.org/3/search/movie', {
            params: {
              api_key: tmdbApiKey,
              query: currentSearchTerm,
            },
          });
        }
  
        // Lisätään seuraava rivi tulostamaan hakukutsun URL
        console.log('Hakukutsu URL:', response.config.url);
  
        // Suodatetaan tulokset hakutermiä ja valittuja genrejä vastaaviksi
        const filteredResults = response.data.results.filter(movie => {
          const genresMatch = selectedGenres.every(genreId =>
            movie.genre_ids.includes(parseInt(genreId, 10))
          );
          return genresMatch;
        });
  
        setSearchResults(filteredResults.slice(0, 20));
      } catch (error) {
        console.error('Virhe elokuvien hakemisessa:', error.response || error.message);
      }
    };
  
    const timeoutId = setTimeout(fetchMovies, 300);
  
    return () => clearTimeout(timeoutId);
  }, [searchTerm, selectedGenres, tmdbApiKey]);

  const handleGenreClick = (genreId) => {
    // Kopioidaan valitut genret uuteen taulukkoon
    const newSelectedGenres = [...selectedGenres];

    // Jos genreId on jo valittuna, poistetaan se, muuten lisätään
    if (newSelectedGenres.includes(genreId)) {
      const index = newSelectedGenres.indexOf(genreId);
      newSelectedGenres.splice(index, 1);
    } else {
      newSelectedGenres.push(genreId);
    }

    // Päivitetään valitut genret tilaan
    setSelectedGenres(newSelectedGenres);
  };

  return (
    <div className="movies-container">
      <h1>Elokuvien hakeminen</h1>

      <div className="filter-bar">
        <input
          type="text"
          placeholder="Hae elokuvia"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="movies-input"
        />

        <div className="genre-buttons">
          <button
            className={selectedGenres.includes('28') ? 'active' : ''}
            onClick={() => handleGenreClick('28')}
          >
            Action
          </button>
          <button
            className={selectedGenres.includes('16') ? 'active' : ''}
            onClick={() => handleGenreClick('16')}
          >
            Animation
          </button>
          <button
            className={selectedGenres.includes('35') ? 'active' : ''}
            onClick={() => handleGenreClick('35')}
          >
            Comedy
          </button>
          <button
            className={selectedGenres.includes('99') ? 'active' : ''}
            onClick={() => handleGenreClick('99')}
          >
            Documentary
          </button>
          <button
            className={selectedGenres.includes('10751') ? 'active' : ''}
            onClick={() => handleGenreClick('10751')}
          >
            Family
          </button>
          <button
            className={selectedGenres.includes('36') ? 'active' : ''}
            onClick={() => handleGenreClick('36')}
          >
            History
          </button>
          <button
            className={selectedGenres.includes('27') ? 'active' : ''}
            onClick={() => handleGenreClick('27')}
          >
            Horror
          </button>
          <button
            className={selectedGenres.includes('10402') ? 'active' : ''}
            onClick={() => handleGenreClick('10402')}
          >
            Music
          </button>
          <button
            className={selectedGenres.includes('10749') ? 'active' : ''}
            onClick={() => handleGenreClick('10749')}
          >
            Romance
          </button>
          <button
            className={selectedGenres.includes('878') ? 'active' : ''}
            onClick={() => handleGenreClick('878')}
          >
            Science Fiction
          </button>
          <button
            className={selectedGenres.includes('53') ? 'active' : ''}
            onClick={() => handleGenreClick('53')}
          >
            Thriller
          </button>
        </div>
      </div>

      <div className="movies-grid">
        {searchResults.map((movie, index) => (
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
            <button>asd</button>
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
                <button>asd</button>
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