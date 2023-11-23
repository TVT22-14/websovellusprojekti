import logo from './logo.svg';
import './App.css';
import { jwtToken, LoginFormOpen } from './components/signals';
import { useState } from 'react';
import {LoginForm, openModal} from './components/auth';

function App() {

  return (
    <div>
      <button id='Login' onClick={openModal}>Kirjaudu sisään</button> {/* Kirjaudu sisään nappi, joka kutsuu openModal functiota auth.js tiedostosta */}
      {LoginFormOpen.value == true && <LoginForm />} {/* Loginform komponentti renderöidään vain jos signaalin LoginFormOpen arvo on true */}
    </div>
  );
}

export default App;
