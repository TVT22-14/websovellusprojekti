// Omien tietojen hakeminen
// Omien tietojen muokkaus 
// Muutosten tallentaminen nappi
// Poista käyttäjä 

// Omien ryhmien tietojen hakeminen
// Kato UI suunnitelma sivu 5
import React from 'react';

import '../joinreq.css';
function Settings() {
    return (
        <div>
            <h1>Asetukset ja ryhmät</h1>
            <p>TÄHÄN SININ KOMPONENTTI</p>





            <JoinRequests />

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
