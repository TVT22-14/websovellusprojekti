import React, { useState, useEffect } from 'react';
import Apikey from './apikey';
import axios from 'axios';

function AllMovies() {
    return(
        <div>
            <h1>MOOVIET TÄÄLLÄ</h1>
            <Review />
        </div>
    )
    }

    function TopMovies({ tmdbApiKey }) {
        const [topMovies, setTopMovies] = useState([]);
      
        useEffect(() => {
          const fetchTopMovies = async () => {
            try {
              console.log('haloo', tmdbApiKey);
              const response = await axios.get('https://api.themoviedb.org/3/trending/movie/week', {
                params: {
                  api_key: tmdbApiKey,
                },
              });        
              setTopMovies(response.data.results);
              
              console.log(response.data.results);
            } catch (error) {
              console.error('Virhe top-elokuvien hakemisessa:', error);
            }
          };
      
          fetchTopMovies();
        }, [tmdbApiKey]);
      
        return (
          <div>
            <h1 style={{ textAlign: 'center' }}>Viikon Top 20 Elokuvat</h1>
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
              {topMovies.map((movie, index) => (
                <div
                  key={movie.id}
                  style={{ flex: '0 0 calc(33% - 20px)', padding: '10px', boxSizing: 'border-box', textAlign: 'center' }}
                >
                  {movie.poster_path && (
                    <img
                      src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                      alt={movie.title}
                      style={{ maxWidth: '100%', height: 'auto' }}
                    />
                  )}
                  <h2 style={{ fontSize: '14px', marginTop: '8px' }}>{`${index + 1}. ${movie.title}`}</h2>
                </div>
              ))}
            </div>
          </div>
        );
      }
      
      function Review() {
        return (
          <Apikey>
            {({ tmdbApiKey }) => <TopMovies tmdbApiKey={tmdbApiKey} />}
          </Apikey>
        );
      }

    export default AllMovies;