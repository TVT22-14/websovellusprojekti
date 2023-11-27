// MoviePlanet logo
// Navigointi linkit (etusivu, leffat, arvostelut, ryhmät, uutiset)
// (Kellonappi)
// (Settings nappi)
// Luo käyttäjä nappi
// Kirjaudu sisään/ulos nappi

import React from 'react';
import { Link } from 'react-router-dom';
import { jwtToken, LoginFormOpen, RegisterFormOpen } from './signals';
import { LoginForm, openModal } from './auth';
import { RegisterForm, openRegisterModal } from './createcustomer';

import '../navbar.css';



// import { FaBell } from "react-icons/fa6"; //reactin oma


function NavBar() {

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

                <Link to="/luokayttaja"><button id='Register' onClick={openRegisterModal}>Rekisteröidy</button> {/* Rekisteröidy nappi, joka kutsuu openModal functiota auth.js tiedostosta */}
                {RegisterFormOpen.value == true && <RegisterForm />}</Link>
                <Link to="/kirjaudu">
                    <button id='Login' onClick={openModal}>Kirjaudu sisään</button> {/* Kirjaudu sisään nappi, joka kutsuu openModal functiota auth.js tiedostosta */}
                    {LoginFormOpen.value == true && <LoginForm />} {/* Loginform komponentti renderöidään vain jos signaalin LoginFormOpen arvo on true */}
                </Link>
            </div>

        </div>

       
    );
}

function NavBarLine() {
    return (
        <div id='navbarline'>
        </div>
    );
}


export default NavBar;

