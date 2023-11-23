import logo from './logo.svg';
import './App.css';
import { jwtToken, LoginFormOpen, RegisterFormOpen} from './components/signals';
import React, { useState } from 'react';
import {LoginForm, openModal,openRegisterModal, RegisterForm} from './components/auth';

function App() {

  return (
    <React.Fragment>
    <div>
      <button id='Login' onClick={openModal}>Kirjaudu sisään</button> {/* Kirjaudu sisään nappi, joka kutsuu openModal functiota auth.js tiedostosta */}
      {LoginFormOpen.value == true && <LoginForm />} {/* Loginform komponentti renderöidään vain jos signaalin LoginFormOpen arvo on true */}
    </div>
    <div>
      <button id='Register' onClick={openRegisterModal}>Rekisteröidy</button> {/* Rekisteröidy nappi, joka kutsuu openModal functiota auth.js tiedostosta */}
      {RegisterFormOpen.value == true && <RegisterForm />}
    </div>
    </React.Fragment>
  );
}

export default App;
