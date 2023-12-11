// Tuoreimmat uutiset + näytä lisää palikka
// Viimeisimmät arvostelut + näytä lisää palikka
// Suosituimmat elokuvat + näytä lisää palikka
// Suosituimman ryhmät + näytä lisää palikka
// Muokkaa näkymää
import React, { useState, useEffect } from 'react';
import '../frontpage.css';
import axios from 'axios';
import Apikey from './apikey';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function FrontPageView() {
    return (
        <div>
            <MovieSearchBar />
            <FreshNews />
            <LastReviews />
            <div id='popularPalkit'>
                <AnnaApikey />
                <MostPopularGroups />
            </div>
        </div>
    )
}


function MovieSearchBar() {

    const navigate = useNavigate();
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (location.pathname === '/elokuvat' && location.state?.searchTerm) {
            setSearchTerm(location.state.searchTerm);
        }
    }, [location]);

    const handleSearch = () => {
        console.log('Before navigate etusivu: ', searchTerm);
        navigate('/elokuvat', { state: { searchTerm } });
        console.log('After navigate etusivu: ', searchTerm);
    };

    

    return (

        <div id='searchMovie'>
            <section id='transParency'>
                <h4 className='haeElokuvatxt'>Hae elokuvaa tai sarjaa</h4>

                <section id='haeElokuva'>
                    <input id='search-box' type='text' placeholder='Hae elokuvaa' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    <button id='searchBtn' onClick={handleSearch}>
                        <img src='/pictures/loupe.png' id="searchBtnImg" alt="search" />
                    </button>
                </section>

                <div id='suodatus'>
                    <button className='genreBtn'>Kauhu(id=27)</button>
                    <button className='genreBtn'>Komedia(id=35)</button>
                    <button className='genreBtn'>Fantasia(id=14)</button>


                    <select id="genreDropdown">
                        <option value="">Lisää genrejä</option>
                        <option value="1">Toiminta(id=28)</option>
                        <option value="2">Seikkailu(id=12)</option>
                        <option value="3">Rikos(id=80)</option>
                        <option value="4">Draama(id=18)</option>
                    </select>
                </div>
            </section>
        </div>

    )
}

function FreshNews() {

    const [news, setNews] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch('https://www.finnkino.fi/xml/News/');
                if (!response.ok) {
                    throw new Error('Uutisten haku epäonnistui');
                }

                const xmldata = await response.text();
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(xmldata, 'text/xml');
                const newsElements = xmlDoc.getElementsByTagName('NewsArticle');
                // Muuta Array.from(newsElements) -> [...newsElements] modernimpaan tyyliin
                const newsData = [...newsElements].slice(0, 4).map((article) => ({
                    Title: article.querySelector('Title').textContent,
                    ArticleURL: article.querySelector('ArticleURL').textContent,
                    ImageURL: article.querySelector('ImageURL').textContent,
                }));

                setNews(newsData);
            } catch (error) {
                console.error('Virhe uutisten hakemisessa:', error);
            }
        };
        fetchNews();
    }, []);

    return (

        <div className='etusivuPalkit'>
            <h4 className='etusivunH4'>Tuoreimmat uutiset</h4>

            <div id='uutisetEtusivu'>
                <ul id='uutisetUlEtusivu'>

                    {news.map((article) => (
                        <li key={article.Title} id='uutisetLiItem'>
                            <img src={article.ImageURL} alt={article.Title} />
                            <a href={article.ArticleURL} target="_blank" className='etusivunLinkit'>
                                {article.Title}
                            </a>
                        </li>
                    ))}
                    <li>
                        {/* button */}
                        <Link to="/uutiset" className='kk1k23312k11'>
                            <button className='naytaLisaaBtn'>Näytä lisää...</button>
                        </Link>

                    </li>
                </ul>
            </div>
        </div>
    )
}

function LastReviews() {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get('http://localhost:3001/review//allmoviereviews');

                if (response.data && response.data.length >= 4) {
                    const lastReviews = response.data.slice(0, 4); // Otetaan kolme ensimmäistä arvostelua
                    setReviews(lastReviews);
                } else {
                    console.log("Arvosteluja ei löytynyt tai niitä on alle 3.");
                }


            } catch (error) {
                console.error('Virhe arvostelujen hakemisessa:', error);
            }
        };

        fetchReviews();
    }, []);


    return (
        <div className='etusivuPalkit'>
            <h4 className='etusivunH4'>Viimeisimmät arvostelut</h4>

            <ul className='lastReviewsEtusivu'>
                {reviews.map(review => (
                    <li className='lastReviewsLiItems' key={review.idreview}>
                        <img src={review.moviepic} alt={review.review} /> <br />
                        <p>{review.idcustomer} (tähän idn sijasta nick)</p> <br />
                        <p>Tähdet: {review.moviestars} </p>

                    </li>
                ))}
                <li>

                    {/* button */}
                    <Link to="/uutiset" className='kk1k23312k11'>
                        <button className='naytaLisaaBtn'>Näytä lisää...</button>
                    </Link>
                </li>
            </ul>




        </div>
    )
}

function MostPopularMovies({ tmdbApiKey }) {
    const [popularMovies, setPopularMovies] = useState([]);

    useEffect(() => {
        const fetchPopularMovies = async () => {
            try {
                const response = await axios.get('https://api.themoviedb.org/3/trending/movie/week', {
                    params: {
                        api_key: tmdbApiKey,
                    },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
                    },
                });


                if (response.data.results && response.data.results.length >= 4) {

                    const trendingMovies = response.data.results.slice(0, 4); // Otetaan kolme ensimmäistä elokuvaa
                    setPopularMovies(trendingMovies);
                } else {
                    console.log("Elokuvia ei löytynyt tai niitä on alle 3.");
                }
            } catch (error) {
                console.error('Virhe top-elokuvien hakemisessa:', error);
            }
        };

        fetchPopularMovies();
    }, []);

    return (

        <div className='moovitpopular'>
            <h4 className='alaetusivun_h4'>Viikon villitykset</h4>
            <ul className='popularitUlEtusivu'>
                {popularMovies.map(movie => (
                    <li className='popularitLiItems' key={movie.id}>
                        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                        <p>{movie.title}</p>
                    </li>

                ))}
                <li>

                    {/* button */}
                    <Link to="/uutiset" className='kk1k23312k11'>
                        <button className='naytaLisaaBtn'>Näytä lisää...</button>
                    </Link>
                </li>
            </ul>


        </div>
    )
};

function AnnaApikey() {
    return (
        <Apikey>
            {({ tmdbApiKey }) => <MostPopularMovies tmdbApiKey={tmdbApiKey} />}
        </Apikey>
    );
}

function MostPopularGroups() {

    const [groups, setGroups] = useState([]);

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await axios.get('http://localhost:3001/community');

                if (response.data && response.data.length >= 4) {
                    const popularGroups = response.data.slice(0, 4); // Otetaan kolme ensimmäistä ryhmää
                    setGroups(popularGroups);
                } else {
                    console.log("Ryhmätietoja ei löytynyt tai niitä on alle 3.");
                }
            } catch (error) {
                console.error('Virhe ryhmien hakemisessa:', error);
            }
        };

        fetchGroups();
    }, []);

    return (
        <div className='groupspopular'>
            <h4 className='alaetusivun_h4'>Suosituimmat ryhmät</h4>

            <ul className='popularitUlEtusivu'>
                {groups.map(group => (
                    <li className='popularitLiItems' key={group.groupname}>
                        <img src={group.grouppic} alt={group.groupname} />
                        <p>{group.groupname}</p>
                    </li>
                ))}
                <li>

                    {/* button */}
                    <Link to="/uutiset" className='kk1k23312k11'>
                        <button className='naytaLisaaBtn'>Näytä lisää...</button>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default FrontPageView;
