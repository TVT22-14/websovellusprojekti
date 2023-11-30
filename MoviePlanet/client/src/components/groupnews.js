import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../groupmembers.css';

// Tällä tuodaan uutiset jotka on jaettu ryhmä sivulle
export const Groupnews = () => {

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

    return (
        <div className='news'>
            <div>
                <h1>Ryhmän uutiset:</h1>
           
            </div>
        </div>
    );
};
