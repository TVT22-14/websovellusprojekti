// Omien tietojen hakeminen
// Omien tietojen muokkaus 
// Muutosten tallentaminen nappi
// Poista käyttäjä 

// Omien ryhmien tietojen hakeminen
// Kato UI suunnitelma sivu 5

import React, { useState } from 'react';
import axios from 'axios';
import { delUser } from './signals';


const username = 'Liisa';

// Function Delete user
export function DeleteUser() {

    const handleDeleteUser = async () => {
        try {
            const response = await axios.delete('http://localhost:3001/customer/', { username })
            if (response.status === 200) {
                delUser(true);
                console.log("Käyttäjä poistettu");
            }
        } catch (error) {
            console.log('virhe käyttäjän poistossa ', error);
        }
    }
return (
    <div>
        <button id='DeleteUser' onClick={handleDeleteUser}>Poista käyttäjä</button>
        {delUser.value == true && <p> Käyttäjä poistettu </p>}
    </div>
)


}









