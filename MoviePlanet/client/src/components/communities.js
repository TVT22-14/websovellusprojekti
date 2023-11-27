// Etsi ryhmää nimellä
// Luo ryhmä 
// Liity ryhmään nappi
// Näytä kaikki ryhmät

import { useEffect, useState } from 'react';
import axios from 'axios';
import { CustomerIDSignal, } from './signals';


// Create a new group

export function CreateGroup() {
    
        const [groupname, setGroupName] = useState('');
        const [descript, setDescription] = useState('');
        const [grouppic, setGroupPic] = useState('');
        const [error, setError] = useState(null);
        const [existingGroupnameError, setExistingGroupnameError] = useState(null);
        var idcustomer = CustomerIDSignal.value;  

        // Function that checks if groupname already exists
        function checkExistingGroupname(groupname){
            axios.get('http://localhost:3001/community/getGroup/?groupname=' + groupname)
            .then(resp => {
                if(resp.data.length > 0){
                    setExistingGroupnameError('Valitsemasi ryhmän nimi on jo käytössä');
                }
                else{
                    setExistingGroupnameError(null);
                }
        })
        .catch(error => {
            setExistingGroupnameError(null);
        });
    }

        // Function that sends data to backend
        function handleCreateGroup() {
    
            checkExistingGroupname(groupname);
            if(existingGroupnameError){return;}

            // const UsernameSignalvalue = 'mikseli';
            axios.get('http://localhost:3001/customer/getUserID/?username=' + UsernameSignalvalue)
            .then(resp => {
               idcustomer = resp.data[0].idcustomer;
                console.log(idcustomer);
            })
            axios.postForm('http://localhost:3001/community', { groupname, grouppic, descript, idcustomer})
                .then(resp => {
    
                        console.log('Ryhmä luotu');
                })
                .catch(error => {
                    console.log(error.response.data); 
                });
        }
    
        return (
            <div className="CreateGroup">
                <h1>Luo uusi ryhmä</h1>
                <div>
                    <label>Ryhmän nimi</label>
                    <input type="text" name="groupname" onChange={e => setGroupName(e.target.value)} />
                    {existingGroupnameError && <p>{existingGroupnameError}</p>}
                </div>
                <div>
                    <label>Kuva</label>
                    <input type="text" name="grouppic" onChange={e => setGroupPic(e.target.value)} />
                </div>
                <div>
                    <label>Kuvaus</label>
                    <input type="text" name="descript" onChange={e => setDescription(e.target.value)} />
                </div>
                
                <button onClick={handleCreateGroup}>Luo ryhmä</button>
            </div>
        );
    }
export default Communities;

