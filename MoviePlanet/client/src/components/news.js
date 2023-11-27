
import React, { useEffect } from 'react';
import { useState } from 'react';
import '../news.css';

function NewsView() {

    const [news, setNews] = useState([]);

    const [userGroups, setUserGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState('');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchNews = async () => {
            try{
                const response = await fetch('https://www.finnkino.fi/xml/News/');
                if(!response.ok){
                    throw new Error('News fetch failed');
                }
                const xmldata = await response.text();
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(xmldata, 'text/xml');

                const newsElements = xmlDoc.getElementsByTagName('NewsArticle');
                const newsData = Array.from(newsElements).map((article) => ({
                    Title : article.querySelector('Title').textContent,
                    ArticleURL : article.querySelector('ArticleURL').textContent,
                    ImageURL : article.querySelector('ImageURL').textContent,

            }));

            console.log(newsData);
            setNews(newsData);
            } catch (error) {
                console.log(error);
            }
        };
        fetchNews();
    }, []);

    const handleShare = (ArticleURL) => {
        // Tänne tulisi oikeasti sitten se valikko juttuli
        console.log('Jaa nappia painettu', ArticleURL); 
        setShowModal(true);
    };
    return(
        <div>
            <h1>UUTISET TÄNNE</h1>
            <p>This is the news view content.</p>
            <ul>
                {news.map((article) => (
                    <li key={article.Title}>
                        <a href={article.ArticleURL}>
                            <img src={article.ImageURL} alt={article.Title} />
                            <h2>{article.Title}</h2>
                        </a>
                        <button onClick={()=> handleShare(article.ArticleURL)}> Jaa</button>
                    </li>
                ))}
            </ul>
            {showModal && (
            <div className='modal'>
                <select value={selectedGroup} onChange={(e) => setSelectedGroup(e.target.value)}>
                    <option value=''>Valitse ryhmä</option>
                    {userGroups.map((group) => (
                        <option key={group.GroupID} value={group.GroupID}>
                            {group.GroupName}
                        </option>
                    ))}
                </select>
                </div>
            )}
        </div>
    )
}

export default NewsView;