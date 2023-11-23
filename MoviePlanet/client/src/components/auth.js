// Tänne tulee Login komponentit
// Kirjaudu sisään ikkuna

import { useState } from 'react';
import axios from 'axios';
import { jwtToken, LoginFormOpen, RegisterFormOpen } from './signals';
import '../auth.css';

// Functio kirjautumista varten
export function LoginForm() {

    const [username, setUsername] = useState('');
    const [pw, setpw] = useState('');

    const [error, setError] = useState(null);

    // Functio joka tekee POST pyynnön backendiin
    function handleLogin() {
        axios.postForm('http://localhost:3001/customer/login', { username, pw })
            .then(resp => {
                jwtToken.value = resp.data.jwtToken;  // Asetetaan tokeni signaaliin
                console.log(resp.data.jwtToken);
                closeModal();
            })
            .catch(error => {
                console.log(error.response.data);
                setError('Virheellinen käyttäjätunnus tai salasana');
                closeModalWithDelay();
            });        
    }
    // functio jolla voi sulkea ikkunan 5 sekunnin kuluttua
    function closeModalWithDelay(){
        setTimeout(() => {
            closeModal();
        }, 5000);
    }
    const closeModal = () => LoginFormOpen.value = false;
   

    return (
        <div className='modal'>
            <div className='modal-content'>
                <span className='close' onClick={closeModal}>&times;</span> {/* vasemmassa reunassa oleva x, josta ikkunan saa suljettua */}
                <input
                    type='text'
                    placeholder='Käyttäjätunnus'
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />{/* Käyttäjätunnuksen syöttö kenttä */}
                <input
                    type='password'
                    placeholder='Salasana'
                    value={pw}
                    onChange={e => setpw(e.target.value)}
                /> {/* Salanasanan syöttö kenttä */}
                {error && <p className='error'>{error}</p>} {/* Virheviesti jos kirjautuminen epäonnistuu */}
                <button id='LoginFormLoginBtn' onClick={handleLogin}>Kirjaudu sisään</button>{/* Kutsutaan functiota joka lähettää tiedot bäkkärille */}
            </div>
        </div>
    );

}

// Function kirjautumis ikkunan aukaisua varten
export const openModal = () => LoginFormOpen.value = true;
export const openRegisterModal = () => RegisterFormOpen.value = true;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Function uuden käyttäjän luomiseen
export function RegisterForm() {

    // tilat kaavakkeen tietojen tallentamiseen sekä error viestin näyttämiseen
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [username, setUsername] = useState('');
    const [pw, setpw] = useState('');
    const [pw2, setpw2] = useState('');
    // Tähän tulee vielä kuvan valinta

    const [error, setError] = useState(null);

    // Functio joka tekee POST pyynnön backendiin
    function handleRegister() {
        axios.postForm('http://localhost:3001/customer', { fname, lname, username, pw })
            .then(resp => {
                console.log('Käyttäjä luotu');       
            })
            .catch(error => {
                console.log(error.response.data);
                if(pw != pw2){
                    setError('Salanat eivät täsmää');
                }
            });        
    }
    // functio jolla voi sulkea ikkunan 5 sekunnin kuluttua
    function closeModalWithDelay(){
        setTimeout(() => {
            closeRegisterModal();
        }, 5000);
    }
    const closeRegisterModal = () => RegisterFormOpen.value = false;
   
    return (
        <div className='modal'>
            <div className='modal-content'>
                <span className='close' onClick={closeRegisterModal}>&times;</span> {/* vasemmassa reunassa oleva x, josta ikkunan saa suljettua */}
                <input
                    type='text'
                    placeholder='Käyttäjätunnus'
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />{/* Käyttäjätunnuksen syöttö kenttä */}
                <input
                    type='password'
                    placeholder='Salasana'
                    value={pw}
                    onChange={e => setpw(e.target.value)}
                /> {/* Salanasanan syöttö kenttä */}
                  <input
                    type='password'
                    placeholder='Salasana uudestaan'
                    value={pw2}
                    onChange={e => setpw2(e.target.value)}
                /> {/* Salasana uudestaan */}
                <input
                    type='text'
                    placeholder='Etunimi'
                    value={fname}
                    onChange={e => setFname(e.target.value)}
                /> {/* Salasana uudestaan */}
                <input
                    type='text'
                    placeholder='Sukunimi'
                    value={lname}
                    onChange={e => setLname(e.target.value)}
                /> {/* Salasana uudestaan */}
                {error && <p className='error'>{error}</p>} {/* Virheviesti jos kirjautuminen epäonnistuu */}
                <button id='LoginFormLoginBtn' onClick={handleRegister}>Luo käyttäjä </button>{/* Kutsutaan functiota joka lähettää tiedot bäkkärille */}
            </div>
        </div>
    );

}



