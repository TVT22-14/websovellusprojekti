import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../groupmembers.css';

// Tällä tuodaan uutiset jotka on jaettu ryhmä sivulle
export const Groupnews = () => {

    const [filteredNews, setFilteredNews] = useState([]);
    const { groupname } = useParams();
    const [groupnews, setGroupnews] = useState([]);
   
    useEffect(() => {
    const fetchData = async () => {
        try {
            console.log('Haetaan ryhmän ' + groupname + ' id tietokannasta');
            const groudIdResponse = await axios.get(`http://localhost:3001/community/getgroupid?groupname=${groupname}`);
            console.log("Tämä on ryhmän id data: ", groudIdResponse.data);
            const groupID = groudIdResponse.data[0]?.idgroup;

            if(groupID) {
            console.log('Haetaan ryhmän ' + groupname + ' uutiset tietokannasta');
            const newsResponse = await axios.get(`http://localhost:3001/news/groupnews?idgroup=${groupID}`);
            console.log('Tässä ovat ryhmän uutiset:', newsResponse.data);
            setGroupnews(newsResponse.data);
            }else {
                console.log('Ryhmän id:tä ei löytynyt');
            }
          
        } catch (error) {
            console.error('Virhe haettaessa ryhmän id:tä:', error);
        }
    };

    fetchData();
    }, [groupname]);

    const fetchNewsByURL = async (urlList) => {
        try {
            // Get news from Finnkino API
            const response = await fetch('https://www.finnkino.fi/xml/News/');
            if (!response.ok) {
                throw new Error('Uutisten haku epäonnistui');
            }
            // Parse XML data
            const xmldata = await response.text();
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmldata, 'text/xml');
    
            // Get news data
            const newsElements = xmlDoc.getElementsByTagName('NewsArticle');
            const newsData = Array.from(newsElements).map((article) => ({
                Title: article.querySelector('Title').textContent,
                ArticleURL: article.querySelector('ArticleURL').textContent,
                ImageURL: article.querySelector('ImageURL').textContent,
            }));
    
            // Filter news by URL list
            const filteredNews = newsData.filter((article) => urlList.includes(article.ArticleURL));
            
            return filteredNews;
        } catch (error) {
            console.error('Virhe haettaessa uutisia:', error);
            return [];
        }
    };
    
    fetchNewsByURL(groupnews.map((news) => news.newsidapi))
    .then((filteredNews) => {
        console.log('Hakutulokset:', filteredNews);
        setFilteredNews(filteredNews);
        
    })
    .catch((error) => {
        console.error('Virhe haettaessa uutisia URL-listan perusteella:', error);
    });

    return (
        <div className='news'>
            <div>
                <h1>Ryhmän uutiset:</h1>
                {filteredNews.map((news) => (
                    <div className='news-card' key={news.ArticleURL}>
                        <img src={news.ImageURL} />
                        <h3>{news.Title}</h3>
                        <a href={news.ArticleURL} target='_blank' rel='noreferrer'>Lue lisää</a>
                    </div>
                ))}
            </div>
        </div>
    );
};
