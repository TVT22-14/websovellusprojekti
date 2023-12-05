// Login components
// Login window

import {useState } from 'react';
import axios from 'axios';
import { jwtToken, LoginFormOpen, UsernameSignal } from './signals';
import '../auth.css';

// Function to open login window
export const openModal = () => LoginFormOpen.value = true;

// Function to logout
export function logout() {
    console.log('logout painettu');
    UsernameSignal.value = null;
    jwtToken.value = null;
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('username');
}

// Function to Login
export function LoginForm() {

    const [username, setUsername] = useState('');
    const [pw, setpw] = useState('');
    const [error, setError] = useState(null);

    // Function for backend POST request
    function handleLogin() {
        axios.postForm('http://localhost:3001/customer/login', { username, pw })
            .then(resp => {
                jwtToken.value = resp.data.jwtToken;  // The token is placed in the signal
                console.log(resp.data.jwtToken);
                UsernameSignal.value = username; // The Username is placed in the signal
                localStorage.setItem('jwtToken', resp.data.jwtToken); // The token is placed in the local storage
                localStorage.setItem('username', username); // The Username is placed in the local storage
                localStorage.setItem('isLoggedIn','true');
                closeModal();
            })
            .catch(error => {
                console.log(error.response.data);
                setError('Virheellinen käyttäjätunnus tai salasana');
                closeModalWithDelay();
            });
    }
    // Function that closes the window after 5 seconds
    function closeModalWithDelay() {
        setTimeout(() => {
            closeModal();
        }, 5000);
    }
    // Function to close the window
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
                />{/* Field for username*/}
                <input
                    type='password'
                    placeholder='Salasana'
                    value={pw}
                    onChange={e => setpw(e.target.value)}
                /> {/* Field for password */}
                {error && <p className='error'>{error}</p>} {/* Error message if login failed */}
                <button id='LoginFormLoginBtn' onClick={handleLogin}>Kirjaudu sisään</button>{/* Button click calls for handelogin function */}
            </div>
        </div>
    );
}



