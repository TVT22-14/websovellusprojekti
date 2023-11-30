import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';


export const GroupLink = () => {
    const [userGroups, setUserGroups] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:3001/community/ownedgroups/?username=' + localStorage.getItem('username'));
          console.log('data haettu onnistuneesti');
          console.log(response.data);
          setUserGroups(response.data || []);
          setLoading(false);
        } catch (error) {
          console.log('vituiksi meni');
          console.log(error);
          setLoading(false);
        }
      };
  
      fetchData();
    }, []); // Tyhjä riippuvuuslista tarkoittaa, että useEffect suoritetaan vain kerran komponentin ensimmäisellä renderöinnillä
  
    // Inform the user that the data is loading
    if (loading) {
      return <div>Loading...</div>;
    }
  
    console.log(userGroups);
  
    return (
      <div>
        <h2>Groups</h2>
        <p>Tässä on nyt dynaamisesti generoidut linkit kirjautuneen käytttäjän ryhmiin</p>
        <ul>
          {userGroups.map((group) => (
            <li key={group.groupname}>
              <Link to={`/ryhma/${group.groupname}`}>{group.groupname}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  