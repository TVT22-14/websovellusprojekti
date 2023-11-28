// Omien tietojen hakeminen
// Omien tietojen muokkaus 
// Muutosten tallentaminen nappi
// Poista käyttäjä 

// Omien ryhmien tietojen hakeminen
// Kato UI suunnitelma sivu 5

import '../settings.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { delUser, jwtToken, UsernameSignal, CustomerIDSignal} from './signals';

function Settings() {
    return (
        <div id='settings'>
            <h2>Käyttäjäasetukset</h2>
            <DeleteUser />
            <h2>Ryhmäasetukset</h2>
            <DeleteGroupMemberships />
            <h2>Liittymispyynnöt</h2>
            <JoinRequests />
        </div>
    )
}

// Function Delete user
function DeleteUser() {

    const handleDeleteUser = async () => {
        const confirmDelete = window.confirm('Haluatko varmasti poistaa käyttäjän ' + UsernameSignal.value + '?');

        if (confirmDelete) {
            try {
                const response = await axios.delete('http://localhost:3001/customer/' + UsernameSignal.value)
                delUser.value = true;
                jwtToken.value = '';
                console.log("Käyttäjä " + UsernameSignal.value + " poistettu");
                alert("Käyttäjä " + UsernameSignal.value + " poistettu onnistuneesti. Sinut on nyt kirjattu ulos.");
            } catch (error) {
                console.log('virhe käyttäjän poistossa ', error);
                alert('Käyttäjän poisto epäonnistui');
            }
        } else {
            console.log('Käyttäjän poisto peruutettu');
        }
    };

    return (
        <div>
            <button id='DeleteUser' onClick={handleDeleteUser}>Poista käyttäjä</button>
        </div>
    )
}


function DeleteGroupMemberships() {

    const [adminGroups, setAdminGroups] = useState([]); // Ryhmän valinta
    const [selectedGroup, setSelectedGroup] = useState(''); // Valittu ryhmä

    const [groupMembers, setGroupMembers] = useState([]); // Jäsenen valinta
    const [selectedMember, setSelectedMember] = useState(''); // Valittu jäsen



    useEffect(() => { // useEffect hookilla haetaan adminin ryhmät tietokannasta
        console.log('UsernameSignal value:', UsernameSignal.value); //username konsoliin

        const getAdminGroups = async () => {
            try {
                const userData = UsernameSignal.value;

                const response = await axios.get('http://localhost:3001/community/ownedgroups', {
                    params: {
                        username: userData,
                    },
                });

                console.log('Ryhmät: ', response.data);

                const ryhmanNimet = response.data.map((group) => group.groupname);
                console.log('Ryhmän nimet: ' + ryhmanNimet); // mäpätään ulos pelkkä ryhmän nimi
                setAdminGroups(ryhmanNimet);    // aseta adminin ryhmän nimet tilaan setAdminGroups

            } catch (error) {
                console.error('Virhe ryhmien hakemisessa ', error);
            }
        };

        getAdminGroups(); // kutsutaan funktiota
    }, []);


    useEffect(() => { 
        if (selectedGroup !== '') { //jos valittu ryhmä ei ole tyhjä, eli jos ryhmä on valittu niin haetaan ryhmän jäsenet
            fetchGroupMembers();
        }
    }, [selectedGroup]);

    const handleGroupChange = (event) => { //päivittää selectedGroup tilan aina kun valittu ryhmä muuttuu dropdownissa
        setSelectedGroup(event.target.value);
            // Haetaan valitun ryhmän jäsenet tietokannasta jo tässä
        fetchGroupMembers(event.target.value);
    };



    // ______________________Haetaan valitun ryhmän jäsenet tietokannasta_______________________
    const fetchGroupMembers = async () => {
        try {

            console.log('Haetaan ryhmän ' + selectedGroup + ' jäsenet tietokannasta');
            const response = await axios.get('http://localhost:3001/community/groupmembers',
                {
                    params: {
                        groupname: selectedGroup, //event.target.value
                    },
                });

                console.log('Response.data:', response.data);

            const memberUsernames = response.data.map((member) => member.username); // mäpätään ulos pelkkä käyttäjänimi
            console.log('Ryhmän ' + selectedGroup + ' jäsenet: ' + memberUsernames);
            
            setGroupMembers(memberUsernames); // aseta ryhmän jäsenet tilaan setGroupMembers
        } catch (error) {
            console.error('Virhe ryhmän jäsenten hakemisessa ', error);
        }
    };

    const handleMemberChange = (event) => { //päivittää selectedMember tilan aina kun valittu jäsen muuttuu dropdownissa
        setSelectedMember(event.target.value);
    };

    const handleRemoveMember = async () => {  // Poistaa valitun jäsenen valitusta ryhmästä
        const confirmDelete = window.confirm('Haluatko varmasti poistaa käyttäjän ' + selectedMember + ' ryhmästä ' + selectedGroup + '?');

            if (confirmDelete) {
                try {
                    const response = await axios.delete('http://localhost:3001/community',
                        {
                            params: {
                                username: selectedMember,
                                groupname: selectedGroup,
                            },
                        });

                    console.log("Käyttäjä " + selectedMember + " poistettu ryhmästä " + selectedGroup);
                    alert("Käyttäjä " + selectedMember + " poistettu ryhmästä " + selectedGroup);

                } catch (error) {
                    console.log('virhe käyttäjän poistossa ', error);
                    alert('Käyttäjän poisto epäonnistui');
                }
            } else {
                console.log('Käyttäjän poisto peruutettu');
            }
        };    
    

    return (
        <div id='deleteMember'>
            <h3>Poista jäsen ryhmästäsi</h3>
            {/* Ryhmän valinta dropdown */}
            <label>Valitse ryhmä: </label>

            <select value={selectedGroup} onChange={handleGroupChange}>
                <option value=''>Valitse ryhmä</option>
                {adminGroups.map((groupName, groupmembership) => (
                    <option key={groupmembership} value={groupName}>
                        {groupName}
                    </option>
                ))}
            </select>

            {/* Jäsenen valinta dropdown */}
            <label>Valitse jäsen: </label>
            <select value={selectedMember} onChange={handleMemberChange}>
                <option value=''>Valitse jäsen</option>
                {groupMembers.map((member) => (
                    <option key={member} value={member}>
                        {member}
                    </option>
                ))}
            </select>

            <button id='removeMembButton' onClick={handleRemoveMember}> Poista jäsen</button>
        </div>
    )

}

function JoinRequests() {

    // const [joinRequests, setJoinRequests] = useState([]); // Liittymispyynnöt

    // useEffect(() => { 


    //     const getJoinRequests = async () => {
    //         try {
    //             const userData = 33; //CustomerIDSignal

    //             const response = await axios.get('http://localhost:3001/community/joinrequests', {
    //                 params: {
    //                     username: userData,
    //                 },
    //             });

    //             console.log('Liittymispyynnöt: ', response.data);

    //             const joinRequests = response.data.map((request) => request.username);
    //             console.log('Liittymispyynnöt: ' + joinRequests); // mäpätään ulos pelkkä käyttäjänimi
    //             setJoinRequests(joinRequests);    // aseta adminin ryhmän nimet tilaan setAdminGroups

    //         } catch (error) {
    //             console.error('Virhe ryhmien hakemisessa ', error);
    //         }
    //     };

    //     getJoinRequests(); // kutsutaan funktiota
    // }, []);
   

    // return (
    //     <div>
    //       <h3>Ryhmiesi liittymispyynnöt</h3>
    //       <ul>
    //         {joinRequests.map((request, index) => (
    //           <li key={index}>
    //             <p>{request.username}, {request.group}</p>
    //             <button id='approveButton'>Hyväksy</button>
    //             <button id='rejectButton'>Hylkää</button>
    //           </li>
    //         ))}
    //       </ul>
    //     </div>
    //   );
}


export default Settings;


