// Omien tietojen hakeminen
// Omien tietojen muokkaus 
// Muutosten tallentaminen nappi
// Poista käyttäjä 

// Omien ryhmien tietojen hakeminen
// Kato UI suunnitelma sivu 5

import '../settings.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { delUser, jwtToken, UsernameSignal } from './signals';

function Settings() {
    return (
        <div id='settings'>
            <h2 className='settings_h2'>Käyttäjäasetukset</h2>
            {/* <DeleteUser /> */}
            <UserSettings />
            <h2 className='settings_h2'>Ryhmäasetukset</h2>
            <DeleteGroupMemberships />
            <h2 className='settings_h2'>Liittymispyynnöt</h2>
            <JoinRequests />
        </div>
    )
}

function UserSettings() {
    const [profilePicture, setProfilePicture] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleProfilePictureChange = (event) => {
        const file = event.target.files[0];
        setProfilePicture(file);
    };

    const handleFirstNameChange = (event) => {
        const value = event.target.value;
        setFirstName(value);
    };

    const handleLastNameChange = (event) => {
        const value = event.target.value;
        setLastName(value);
    };

    const handleSubmit = () => {
        console.log('Päivitetty profiili:', {
            profilePicture,
            firstName,
            lastName,
        });
        // Tässä voit lähettää päivitetyt tiedot palvelimelle
    };


    
    return (
        <div id='userSettingsDiv'>
        <div className='profileInfo'>
            <div className='profileImage'>
                <label className='liittymispyynnotP'>Profiilikuva</label>
                <input type='file' id='profilePicture' name='profilePicture' accept='image/*' onChange={handleProfilePictureChange}></input>
                {profilePicture && (
                    <img className='profilePreview' src={URL.createObjectURL(profilePicture)} alt='Profile Preview' />
                )}
            </div>

            <div className='userInfo'>
                <p className='liittymispyynnotP'>Käyttäjätunnus</p>
                <label id='usernameLabel'>{UsernameSignal.value}</label>
                <p className='liittymispyynnotP'>Etunimi</p>
                <input type='text' id='firstname' name='firstname' placeholder='Etunimi' value={firstName} onChange={handleFirstNameChange}></input>
                <p className='liittymispyynnotP'>Sukunimi</p>
                <input type='text' id='lastname' name='lastname' placeholder='Sukunimi' value={lastName} onChange={handleLastNameChange}></input>
            </div>
        </div>

        <button onClick={handleSubmit} id='saveSettingsBtn'>Tallenna muutokset</button>

        <p className='liittymispyynnotP'>Käyttäjän poistaminen</p>
        <DeleteUser />
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
            <button id='DeleteUser' onClick={handleDeleteUser}>Poista käyttäjä {UsernameSignal.value}</button>
        </div>
    )
}
//________________________RYHMÄN JÄSENEN POISTO________________________________

function DeleteGroupMemberships() {

    const [adminGroups, setAdminGroups] = useState([]); // Ryhmän valinta
    const [selectedGroup, setSelectedGroup] = useState(''); // Valittu ryhmä

    const [groupMembers, setGroupMembers] = useState([]); // Jäsenen valinta
    const [selectedMember, setSelectedMember] = useState(''); // Valittu jäsen

    const [isSelfRemovalAttempted, setIsSelfRemovalAttempted] = useState(false); // admin ei voi poistaa itseään


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

    const handleGroupChange = (event) => { //päivittää selectedGroup tilan aina kun valittu ryhmä muuttuu dropdownissa
        setSelectedGroup(event.target.value);
    };

    // _______Haetaan valitun ryhmän jäsenet tietokannasta_______

    useEffect(() => {
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

        if (selectedGroup !== '') { // jos valittu ryhmä ei ole tyhjä, eli jos ryhmä on valittu niin haetaan ryhmän jäsenet
            fetchGroupMembers();
        }

    }, [selectedGroup]);

    const handleMemberChange = (event) => {  //päivittää selectedMember tilan aina kun valittu jäsen muuttuu dropdownissa
        const selectedMemberValue = event.target.value;
        console.log('Valittu jäsen:', selectedMemberValue);
        setSelectedMember(selectedMemberValue);

        if (selectedMemberValue === UsernameSignal.value) { 
            setIsSelfRemovalAttempted(true);
        } else {
            setIsSelfRemovalAttempted(false);
        }
    };

    useEffect(() => {
        console.log('selectedMember (effect):', selectedMember);
        console.log('UsernameSignal.value (effect):', UsernameSignal.value);
    }, [selectedMember, UsernameSignal.value]);

    

    const handleRemoveMember = async () => {  // Poistaa valitun jäsenen valitusta ryhmästä

        console.log('selectedMember:', selectedMember);
        console.log('UsernameSignal.value:', UsernameSignal.value);

        

        if (selectedMember === UsernameSignal.value) { //admin ei voi poistaa itseään
            setIsSelfRemovalAttempted(true);
            return;
        }

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
            <label className='laabeli1'>Valitse ryhmä: </label>

            <select className="poistaJasenDropdown" value={selectedGroup} onChange={handleGroupChange}>
                <option className="poistajasenOption" value=''>Valitse ryhmä</option>
                {adminGroups.map((groupName, groupmembership) => (
                    <option key={groupmembership} value={groupName}>
                        {groupName}
                    </option>
                ))}
            </select>

            {/* Jäsenen valinta dropdown */}
            <label className='laabeli1'>Valitse jäsen: </label>
            <select className="poistaJasenDropdown" value={selectedMember} onChange={handleMemberChange}>
                <option className="poistajasenOption" value=''>Valitse jäsen</option>
                {groupMembers.map((member) => (
                    <option key={member} value={member}>
                        {member}
                    </option>
                ))}
            </select>

            <button id='removeMembButton' onClick={handleRemoveMember} disabled={isSelfRemovalAttempted}>
            {isSelfRemovalAttempted ? "Et voi poistaa itseäsi" : "Poista jäsen"}
        </button>
        </div>
    )
}



//__________LIITTYMISPYYNNÖT_______________________________
function JoinRequests() {

    const [joinRequests, setJoinRequests] = useState([]); // Liittymispyynnöt
    const [userId, setUserId] = useState(null); // Käyttäjän ID tietokannasta
    const [requesterId, setRequesterId] = useState(null); // Liittymispyynnön lähettäjän ID tietokannasta
    const [groupId, setGroupId] = useState(null); // Ryhmän ID tietokannasta

    useEffect(() => {
        const getUserId = async () => {
            try {
                const userData = UsernameSignal.value;
                const response = await axios.get('http://localhost:3001/customer/getUserID', {
                    params: {
                        username: userData,
                    },
                });
                const userId = response.data[0].idcustomer; //talletetaan käyttäjän ID userId tilaan

                setUserId(userId); // aseta userId tilaan setUserId
                console.log('Kirjautuneen käyttäjän ' + userData + ' id: ', userId);

            } catch (error) {
                console.error('Virhe kirjautuneen käyttäjän ID:n hakemisessa ', error);
            }
        };
        getUserId();
    }, []);



    useEffect(() => {
        const getJoinRequests = async () => {
            try {
                if (userId) {
                    const response = await axios.get('http://localhost:3001/groupmembership/joinrequests', {
                        params: {
                            idcustomer: userId,
                        },
                    });

                    console.log('Liittymispyynnöt (koko data): ', response.data);

                    if (response.data.length > 0) {
                        const updatedRequests = await Promise.all(response.data.map(async (request) => {
                            const requesterUsername = request.username;
                            console.log('Liittymispyynnön lähettäjän käyttäjänimi: ', requesterUsername);

                            const groupName = request.groupname;
                            console.log('Tähän ryhmään halutaan liittyä nimi: ', groupName);

                            const [requesterId, groupId] = await Promise.all([
                                getRequesterId(requesterUsername),
                                getGroupId(groupName),
                            ]);

                            console.log('Saatavilla handleApprove ja handleReject -funktioille:');
                            console.log('requesterId: ', requesterId);
                            console.log('groupId: ', groupId);

                            return {
                                ...request,
                                requesterId: requesterId,
                                groupId: groupId,
                            };
                        }));

                        setJoinRequests(updatedRequests);
                    }
                }
            } catch (error) {
                console.error('Virhe ryhmien hakemisessa ', error);
            }
        };

        getJoinRequests();
    }, [userId]);


    // Haetaan liittymispyynnön lähettäjän ID________
    const getRequesterId = async (requesterUsername) => {
        try {
            const response = await axios.get('http://localhost:3001/customer/getUserID', {
                params: {
                    username: requesterUsername,
                },
            });

            const requesterId = response.data[0].idcustomer; //talletetaan lähettäjän ID requesterId tilaan
            setRequesterId(requesterId); // aseta requesterId tilaan setRequesterId

            console.log('getRequesterId funktiosta päivää! \nLiittymispyynnön lähettäjän id: ', response.data[0].idcustomer);

            return requesterId;

        } catch (error) {
            console.error('Virhe liittymispyynnön lähettäneen käyttäjän ID:n hakemisessa ', error);
        }
    };
    // getRequesterId();

    // Haetaan ryhmän ID___________________________
    const getGroupId = async (groupName) => {
        try {
            const response = await axios.get('http://localhost:3001/community/getgroupid', {
                params: {
                    groupname: groupName,
                },
            });

            const groupId = response.data[0].idgroup; //talletetaan ryhmän ID groupId tilaan
            setGroupId(groupId); // aseta groupId tilaan setGroupId
            console.log('getGroupId funktiosta päivää! \nTähän ryhmään halutaan liittyä ID: ', groupId);

            return groupId;
        } catch (error) {
            console.error('Virhe ryhmän ID:n hakemisessa ', error);
        }
    };
    // getGroupId();


    // HYVÄKSY LIITTYMISPYNNÖT
    const handleApprove = async (username, groupname, requesterId, groupId) => {
        const confirmApprove = window.confirm('Haluatko varmasti hyväksyä käyttäjän ' + username + ' liittymispyynnön ryhmään ' + groupname + '?');

        if (confirmApprove) {
            try {
                console.log('Lähetetään hyväksyntäpyyntö palvelimelle...');
                console.log('Pyytäjän Id: ', requesterId, 'käyttäjänimi: ', username);
                console.log('Ryhmän Id: ', groupId, 'ryhmän nimi: ', groupname);

                const response = await axios.put('http://localhost:3001/groupmembership/accept', {
                    idcustomer: requesterId,
                    idgroup: groupId,


                });

                console.log("Käyttäjä " + username + ' ' + requesterId + " hyväksytty ryhmään " + groupname + ' ' + groupId);
                alert("Käyttäjä " + username + " hyväksytty ryhmään " + groupname);

                // Päivitä liittymispyynnöt
                const updatedRequests = joinRequests.filter(req => req.username !== username);
                setJoinRequests(updatedRequests);

            } catch (error) {
                console.log('virhe käyttäjän hyväksymisessä ', error);
                alert('Käyttäjän hyväksyminen epäonnistui');
            }
        } else {
            console.log('Käyttäjän hyväksyminen peruutettu');
        }
    };

    // HYVÄKSY LIITTYMISPYNNÖT
    const handleReject = async (username, groupname, requesterId, groupId) => {
        const confirmReject = window.confirm('Haluatko varmasti hylätä käyttäjän ' + username + ' liittymispyynnön ryhmään ' + groupname + '?');

        if (confirmReject) {
            try {

                console.log('Lähetetään hylkäyspyyntö palvelimelle...');
                console.log('Pyytäjän Id: ', requesterId, 'username: ', username);
                console.log('Ryhmän Id: ', groupId, 'groupname: ', groupname);

                const response = await axios.delete('http://localhost:3001/groupmembership/deny', {
                    data: {
                        idcustomer: requesterId,
                        idgroup: groupId,
                    },


                });

                console.log("Käyttäjä " + username + '' + requesterId + " liittymispyyntö hylätty ryhmään " + groupname + '' + groupId);
                alert("Käyttäjän " + username + " liittymispyyntö hylätty ryhmään " + groupname);

                // Päivitä liittymispyynnöt
                const updatedRequests = joinRequests.filter(req => req.username !== username);
                setJoinRequests(updatedRequests);

            } catch (error) {
                console.log('virhe käyttäjän hylkäämisessä ', error);
                alert('Käyttäjän hylkääminen epäonnistui');
            }
        } else {
            console.log('Käyttäjän hylkääminen peruutettu');
        }
    };

    return (
        <div>
            <h3>Ryhmiesi liittymispyynnöt</h3>
            <ul id='liittymispyynnot'>
                {joinRequests.map((request, index) => (
                    <li key={index} id='liittymispyynnotItems'>
                        <p id='liittymispyynnotP'>{request.username}, {request.groupname}</p>
                        <button onClick={() => handleApprove(request.username, request.groupname, request.requesterId, request.groupId)} id='approveButton'>Hyväksy</button>
                        <button onClick={() => handleReject(request.username, request.groupname, request.requesterId, request.groupId)} id='rejectButton'>Hylkää</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}


export default Settings;


