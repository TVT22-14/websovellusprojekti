// Omien tietojen hakeminen
// Omien tietojen muokkaus 
// Muutosten tallentaminen nappi
// Poista käyttäjä 

// Omien ryhmien tietojen hakeminen
// Kato UI suunnitelma sivu 5

import React, { useState } from 'react';
import axios from 'axios';
import { delUser, jwtToken, UsernameSignal } from './signals';

// Function Delete user
export function DeleteUser() {

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

