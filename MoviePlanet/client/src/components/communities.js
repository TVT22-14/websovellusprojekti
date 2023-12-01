// Etsi ryhmää nimellä
// Luo ryhmä 
// Liity ryhmään nappi
// Näytä kaikki ryhmät

import { useEffect, useState } from 'react';
import axios from 'axios';
import { UsernameSignal, CreateGroupFormOpen, GroupCreated } from './signals';
import '../communities.css';

// Function to open create group window
export const openCreateGroupModal = () => CreateGroupFormOpen.value = true;



function Communities() {
    return (
        <div id='Communities'>
            <h1 id='ryhmat'>Ryhmät</h1>
            <FindGroup />
            <CreateGroupBtn />
            <h2 id='kryhmat'>Kaikki ryhmät</h2>
            <ShowAllGroups />
        </div>
    )
}

// Function to open create group window
function CreateGroupBtn() {
    return (
        <div>
            <button id='openCreateGroupBtn' onClick={openCreateGroupModal}>Luo uusi ryhmä</button>
            {CreateGroupFormOpen.value === true && <CreateGroup />}
        </div>
    )
}

// Function to create a new group
function CreateGroup() {

    const [groupname, setGroupName] = useState('');
    const [descript, setDescription] = useState('');
    const [grouppic, setGroupPic] = useState('');
    const [error, setError] = useState(null);
    const [existingGroupnameError, setExistingGroupnameError] = useState(null);


    // Function that checks if groupname already exists
    function checkExistingGroupname(groupname) {
        axios.get('http://localhost:3001/community/getGroup/?groupname=' + groupname)
            .then(resp => {
                if (resp.data.length > 0) {
                    setExistingGroupnameError('Valitsemasi ryhmän nimi on jo käytössä');
                }
                else {
                    setExistingGroupnameError(null);
                }
            })
            .catch(error => {
                setExistingGroupnameError(null);
            });
    }

    // Function for creating a new group
    function handleCreateGroup() {

        // Get customerid from database
        axios.get('http://localhost:3001/customer/getUserID/?username=' + UsernameSignal.value)
            .then(resp => {
                const idcustomer = resp.data[0].idcustomer;     // Save idcustomer to variable
                sendGroupData({ idcustomer });                  // Call function to send data to backend
            })
            .catch(error => {
                console.log(error.response.data);
            });
    }

    // Function that sends data to backend
    function sendGroupData({ idcustomer }) {
        axios.postForm('http://localhost:3001/community', { groupname, grouppic, descript, idcustomer })
            .then(resp => {
                console.log('Ryhmä luotu');
                GroupCreated.value = true;
                closeModalWithDelay();
            })
            .catch(error => {
                setError(error.response.data);
            });
    }

    // Function that closes the window after 5 seconds
    function closeModalWithDelay() {
        setTimeout(() => {
            closeModal();
        }, 5000);
    }

    // Function to close the window
    const closeModal = () => CreateGroupFormOpen.value = false;

    return (
        <div className='modal'>
            <div className='modal-content'>
                <span className='close' onClick={closeModal}>&times;</span>
                <div>
                    <h1>Luo uusi ryhmä</h1>
                </div>
                <input
                    type="text"
                    placeholder='Ryhmän nimi'
                    name="groupname"
                    onChange={(e) => {
                        setGroupName(e.target.value);
                        checkExistingGroupname(e.target.value);
                    }}
                />
                <input
                    type="text"
                    placeholder='Lisää ryhmäkuvan URL-osoite'
                    name="grouppic" onChange={e =>
                        setGroupPic(e.target.value)}
                />
                <input
                    type="text"
                    placeholder='Ryhmän kuvaus'
                    name="descript"
                    onChange={e =>
                        setDescription(e.target.value)}
                />
                {error && <p className='error'>{error}</p>}
                {existingGroupnameError && <p className='error'>{existingGroupnameError}</p>}   {/* Error message if groupname already exists */}
                {GroupCreated.value && <p className='success'>Ryhmä luotu onnistuneesti!</p>}   {/* Success message if group is created */}
                <button id='CreateGroupBtn' onClick={handleCreateGroup}>Luo ryhmä</button>      {/* Button click calls for handelogin function */}
            </div>
        </div>
    );
};

function FindGroup() {
    const [grouppic, setGroupPic] = useState('');
    const [groupname, setGroupName] = useState('');
    const [descript, setDescription] = useState('');
    const [error, setError] = useState(null);

    // Function to find a group by name
    async function handleFindGroup() {
        try {
            const response = await axios.get('http://localhost:3001/community/getGroup/?groupname=' + groupname);
            const grouppic = response.data[0].grouppic;
            const descript = response.data[0].descript;
            setError(null);
            setGroupPic(grouppic);
            setDescription(descript);
            console.log(grouppic, groupname, descript);
        } catch (error) {
            console.log(error.response.data);
            setError('Ryhmää ei löytynyt');
        }
    }

    return (
        <div id='SearchGroup'>
            <input
                id='SearchGroupInput'
                type="text"
                placeholder='Etsi ryhmää nimellä'
                name="groupname"
                onChange={e => setGroupName(e.target.value)}
            />
            <button id='SearchGroupBtn' onClick={handleFindGroup}><img src='/pictures/search.png' alt="search" /></button>

            <div className="GroupInfo">
                {error && <p className='error'>{error}</p>}
                {grouppic && (
                    <div className="GroupInfo">
                        <img src={grouppic} alt="Ryhmän kuva" />
                        <h3>{groupname}</h3>
                        <p>{descript}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

function ShowAllGroups() {
    const [groups, setGroups] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3001/community')
            .then(response => {
                setGroups(response.data); // Assuming response.data is an array of groups
            })
            .catch(error => {
                setError('Ryhmien hakemisessa tapahtui virhe');
            });
    }, []);

    return (
        <div className="AllGroups">
            {error && <p className='error'>{error}</p>}
            <div className="GroupList">
                {groups.map(group => (
                    <div key={group.groupname} className="GroupItem">
                        <img src={group.grouppic} alt="Ryhmän kuva" />
                        <h3>{group.groupname}</h3>
                        <p>{group.descript}</p>
                        {<JoinGroup groupName={group.groupname} />}
                    </div>
                ))}
            </div>
        </div>
    );
}

function JoinGroup({ groupName }) {
    const [error, setError] = useState(null);
    const [buttonText, setButtonText] = useState('Liity ryhmään');

    const handleJoinGroup = async () => {
        try {
            const idGroupResponse = await axios.get(`http://localhost:3001/community/getgroupid?groupname=${groupName}`);
            const idGroup = idGroupResponse.data[0].idgroup;
            console.log(idGroup);


            const idCustomerResponse = await axios.get(`http://localhost:3001/customer/getUserID/?username=${UsernameSignal.value}`);
            const idCustomer = idCustomerResponse.data[0].idcustomer;
            console.log(idCustomer);

            const requestData = {
                roles: 1,
                idcustomer: idCustomer,
                idgroup: idGroup
            };
            console.log(requestData);
            await axios.post('http://localhost:3001/groupmembership/join', requestData);
            
            setButtonText('Liittymispyyntö lähetetty');
            alert(`Lähetit ryhmään ${groupName} liittymispyynnön`);
        } catch (error) {
            setError('Ryhmään liittymisessä tapahtui virhe');
        }
    };

    return (

        <button id='JoinGroupBtn' onClick={handleJoinGroup}>{buttonText}</button>
    );
}

export default Communities;