// Tuoreimmat uutiset + näytä lisää palikka
// Viimeisimmät arvostelut + näytä lisää palikka
// Suosituimmat elokuvat + näytä lisää palikka
// Suosituimman ryhmät + näytä lisää palikka
// Muokkaa näkymää
import React, { useState, useEffect } from 'react';
import '../frontpage.css';
import axios from 'axios';




function FrontPageView() {
    return (
        <div>
            <MovieSearchBar />
            <FreshNews />
            <LastReviews />
            <div id='popularPalkit'>
            <MostPopularMovies />
            <MostPopularGroups />
            </div>
            

        </div>
    )
}


function MovieSearchBar() {

    return (

        <div id='searchMovie'>
            <section id='transParency'>
                <h4 className='haeElokuvatxt'>Hae elokuvaa tai sarjaa</h4>

                <section id='haeElokuva'>
                    <input id='search-box' type='text' placeholder='Hae elokuvaa' />
                    <button id='searchBtn'><img src='/pictures/loupe.png' id="searchBtnImg" alt="search" value="search" />
                    </button>
                </section>

                <div id='suodatus'>
                    {/* <label>Suodata</label> <br /> */}
                    <button className='genreBtn'>Kauhu</button>
                    <button className='genreBtn'>Komedia</button>
                    <button className='genreBtn'>Scifi</button>


                    <select id="genreDropdown">
                        <option value="">Lisää genrejä</option>
                        <option value="1">kissa</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
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

            <div id='uutiset'>
                <ul id='uutisetLiItem'>

                    {news.map((article) => (
                        <li key={article.Title}>
                            <img src={article.ImageURL} alt={article.Title} />
                            <a href={article.ArticleURL} target="_blank">
                                {article.Title}
                            </a>
                        </li>
                    ))}
                    <li>

                        <button className='lisaaUutisia'>
                            Lisää...
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}

function LastReviews() {
    
        return (
            <div className='etusivuPalkit'>
                <h4 className='etusivunH4'>Viimeisimmät arvostelut</h4>
    
               
            </div>
        )
}

function MostPopularMovies() {

    // const response = fetch.get('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1');
    
        return (
            <div className='moovitpopular'>
                <h4 className='etusivunH4'>Viikon villitykset</h4>
            </div>
        )
}

function MostPopularGroups() {
    
        return (
            <div className='groupspopular'>
                <h4 className='etusivunH4'>Suosituimmat ryhmät</h4>
            </div>
        )
}
export default FrontPageView;
