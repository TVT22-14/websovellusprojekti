// Tuoreimmat uutiset + näytä lisää palikka
// Viimeisimmät arvostelut + näytä lisää palikka
// Suosituimmat elokuvat + näytä lisää palikka
// Suosituimman ryhmät + näytä lisää palikka
// Muokkaa näkymää
import React, { useState, useEffect } from 'react';
import '../frontpage.css';




function FrontPageView() {
    return (
        <div>
            <MovieSearchBar />
            <FreshNews />
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
                const newsData = [...newsElements].slice(0, 3).map((article) => ({
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

        <div id='freshNews'>
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

export default FrontPageView;
