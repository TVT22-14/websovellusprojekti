// Get all the group members
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../groupmembers.css';

export const GroupMembers = () => {
    const { groupname } = useParams();
    const [groupmembers, setGroupmembers] = useState([]);

    const fetchGroupMembers = async () => {
        try {
            console.log('Haetaan ryhmän ' + groupname + ' jäsenet tietokannasta');
            const response = await axios.get('http://localhost:3001/community/groupmembers', {
                params: {
                    groupname: groupname 
                },
            });
            setGroupmembers(response.data);

            console.log('Response.data:', response.data);

            const memberUsernames = response.data.map((member) => member.username);
            console.log('Ryhmän ' + groupname + ' jäsenet: ' + memberUsernames);
        } catch (error) {
            console.error('Virhe haettaessa ryhmän jäseniä:', error);
        }
    };

    useEffect(() => {
        fetchGroupMembers();
    }, [groupname]); 

    return (
        <div id='members'>
                <h1 className='membersheader'>Ryhmän jäsenet:</h1>
                <ul className='membersul'>
                    {groupmembers.map((member) => (
                            <li className ='membersli' key={member.username}>
                                {member.username} 
                            </li>
                     ))}
                </ul>
        </div>
    );
};

