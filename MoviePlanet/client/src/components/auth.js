// Tänne tulee Login komponentit
// Kirjaudu sisään ikkuna

import { useState } from 'react';
import axios from 'axios';
import { jwtToken, LoginFormOpen } from './signals';
import '../auth.css';


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

export const openModal = () => LoginFormOpen.value = true;



