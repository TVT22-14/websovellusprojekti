// Omien tietojen hakeminen
// Omien tietojen muokkaus 
// Muutosten tallentaminen nappi
// Poista käyttäjä 

// Omien ryhmien tietojen hakeminen
// Kato UI suunnitelma sivu 5

import '../joinreq.css';
import React, { useState } from 'react';
import axios from 'axios';
import { delUser, jwtToken, UsernameSignal } from './signals';

function Settings() {
    return (
        <div>
            <h1>Asetukset ja ryhmät</h1>
           <DeleteUser/>
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

function JoinRequests() {
    return (
        <div id='joinRequests'>
            <h2>Luomasi ryhmät</h2>
            <p>Täällä voit muokata ryhmiesi jäseniä</p>
            {/* Ryhmän valinta dropdown */}
            <label>Valitse ryhmä: </label>
            <select value="">
                <option value="">Omat ryhmät</option>
                <option value="Group1">Koodaa1 </option>
                <option value="Group2">Group 2</option>
                <option value="Group2">Group 3</option>
                <option value="Group2">Group 4</option>
                {/* Lisää muita ryhmiä tarvittaessa */}
            </select>

            {/* Jäsenen valinta dropdown */}
            <label>Valitse käyttäjä: </label>
            <select value>
                <option value="">Select Member</option>
                <option value="Member1">Member 1</option>
                <option value="Member2">Member 2</option>
                {/* Lisää muita jäseniä tarvittaessa */}
            </select>

            {/* Jäsenen poisto */}
            <button id='removeMembButton'>Poista ryhmän jäsen</button>

            {/* Liittymispyynnöt */}
            <h3>Ryhmiesi liittymispyynnöt</h3>
            <ul>
                <li>
                    <p>käyttäjänimi, ryhmä</p> 
 
                    <button id='approveButton'>Hyväksy</button>
                    <button id='rejectButton'>Hylkää</button>
                </li>
                <li>
                <p>käyttäjänimi, ryhmä</p> 
 
                    <button id='approveButton'>Hyväksy</button>
                    <button id='rejectButton'>Hylkää</button>
                </li>
                <li>
                <p>käyttäjänimi, ryhmä</p> 
 
                    <button id='approveButton'>Hyväksy</button>
                    <button id='rejectButton'>Hylkää</button>
                </li>
            </ul>
        </div>
    )
}
export default Settings;


