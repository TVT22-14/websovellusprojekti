
// This component shows group page view. All the data that groupmembers have access to is shown here.

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../groupdetails.css';

export const GroupDetails = () => {
    const { groupname } = useParams();
    const [groupData, setGroupData] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/community/getgroup?groupname=${groupname}`);
         console.log('Response.data: ', response.data);
          setGroupData(response.data);
        
        } catch (error) {
          console.log('Virhe tapahtui');
          console.log(error);
        }
      };
     
      fetchData();
    }, [groupname]);
    console.log('GroupData: ', groupData);

    if (groupData && groupData.length > 0) {
        console.log('Groupname:', groupData[0].groupname);
        console.log('Descript:', groupData[0].descript);
        console.log('Grouppic:', groupData[0].grouppic);
      }
  
    return (
      <div>
        
          {groupData && (
            <div className='group-info'>
                <div className='header'>
                    <img src={groupData[0].grouppic} alt="Ryhmän kuva" />
                    <h2>{groupData[0].groupname}</h2> 
                </div>  
                <div className='desc'>
                <h3>Kuvaus:</h3>
                <p>{groupData[0].descript} </p>
                </div>
                
            </div>
          )}
          
        
      </div>
    );
  };
  
