import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../groupdetails.css';

export const GroupDetails = () => {
    const { groupname } = useParams();
    const [groupData, setGroupData] = useState(null);
  
    // Get group data from database by groupname
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

    if (groupData && groupData.length > 0) {
        console.log('Groupname:', groupData[0].groupname);
        console.log('Descript:', groupData[0].descript);
        console.log('Grouppic:', groupData[0].grouppic);
      }
  
    return (
      <div id='group-info'>
          {groupData && (
            <div className='group-infoitem'>
                <div className='header'>
                    <img className='groupinfopic' src={groupData[0].grouppic} alt="Ryhmän kuva" />
                    <h2 className='groupinfoname'>{groupData[0].groupname}</h2> 
                </div>  
                <div className='line'></div>
                <div className='desc'>
                <h3 className='descheader'>Kuvaus:</h3>
                <p className='desctext'>{groupData[0].descript} </p>
                </div>
            </div>
          )}
      </div>
    );
  };
  
