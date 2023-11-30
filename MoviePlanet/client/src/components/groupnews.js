import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../groupmembers.css';

// Tällä tuodaan uutiset jotka on jaettu ryhmä sivulle
export const Groupnews = () => {

    const { groupname } = useParams();
    const [groupnews, setGroupnews] = useState([]);

    // Ensin haetaan groupid ryhmän nimen perusteella

    // voisiko tän nyt muuttaa edes nimeksi? 
    idgroup = idgroup;

    const [groupmembers, setGroupmembers] = useState([]);

    const fetchGroupNews = async () => {
        try {
            console.log('Haetaan ryhmän ' + groupname + ' uutiset tietokannasta');
            const response = await axios.get('http://localhost:3001/news/groupnews?idgroup=',{idgroup});
            console.log('Response.data:', response.data);
            setGroupnews(response.data);
        } catch (error) {
            console.error('Virhe haettaessa ryhmän uutisia:', error);
        }
    };

    useEffect(() => {
        fetchGroupNews();
    }, [groupid]); 

    return (
        <div className='news'>
            <div>
                <h1>Ryhmän uutiset:</h1>
                <ul>
                    {groupnews.map((news) => (
                            <li key={news.newsapi}>
                                {news.newsapi} 
                            </li>
                     ))}
                </ul>
            </div>
        </div>
    );
};
