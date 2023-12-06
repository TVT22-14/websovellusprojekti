// MoviePlanet logo
// Navigointi linkit (etusivu, leffat, arvostelut, ryhmät, uutiset)
// (Kellonappi)
// (Settings nappi)
// Luo käyttäjä nappi
// Kirjaudu sisään/ulos nappi

import React from 'react';
import { Link } from 'react-router-dom';
import { LoginFormOpen, RegisterFormOpen, UsernameSignal } from './signals';
import { LoginForm, openModal, logout, LoggedIn} from './auth';
import { RegisterForm, openRegisterModal} from './createcustomer';

import '../navbar.css';

function NavBar() {

    // Check if user is logged in
    LoggedIn();

    return (
        <div id='navbar'>
            <Link to="/"><h1 id='sivunnimi'>MoviePlanet</h1></Link>

            <div id='legit-nav-linkit'>
                <Link to="/">Etusivu</Link>
                <Link to="/uutiset">Uutiset</Link>
                <Link to="/elokuvat">Elokuvat</Link>
                <Link to="/arvostelut">Arvostelut</Link>
                <Link to="/ryhmat">Ryhmät</Link>
            </div>
            <div id='notif-settings'>
                <Link to="/ilmoitukset"><img src='/pictures/001-bell.png' alt="notifications" /></Link> {/* Tämä laitettava ehkä buttoniksi jos halutaan että aukeaa mini ikkuna ehk*/}
                <Link to="/asetukset"><img src='/pictures/002-settings.png' alt="settings" /></Link>
            </div>
            <div className='buttons'>
                {/* If user is logged in show "Tervetuloa! {username}". If not show register btn*/}
                {
                    UsernameSignal.value? (
                        <p>Tervetuloa {UsernameSignal.value}</p>
                    ) : (
                <button id='Register' onClick={openRegisterModal}>Rekisteröidy</button> 

                    )
                }
                {RegisterFormOpen.value === true && <RegisterForm />}
                
                {/* If user is logged in show "kirjadu ulos" and other wise */ }
                {
                UsernameSignal.value? (
                    <button id='Logout' onClick={logout}>Kirjaudu ulos</button> 
                )  : (
                <button id='Login' onClick={openModal}>Kirjaudu sisään</button>
                )
                }
                   {LoginFormOpen.value === true && <LoginForm />} 
            </div>
        </div>
    );
}


export default NavBar;

