import logo from './logo.svg';
import './App.css';
import { jwtToken, LoginFormOpen } from './components/signals';
import { useState } from 'react';


// IMPORTIT ROUTE LINKEILLE
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import NavBar from './components/navbar';

import FrontPageView from './components/frontpageview';
import NewsView from './components/news';
import AllMovies from './components/movies';
import MakeReview from './components/review';
import Communities from './components/communities';
//ilmoitukset tähän
//asetukset tähän
//luokayttaja tähän
import { LoginForm, openModal } from './components/auth';
//___________________________________________________________

import { jwtToken, LoginFormOpen, RegisterFormOpen} from './components/signals';
import React, { useState } from 'react';
import {LoginForm, openModal} from './components/auth';
import { openRegisterModal, RegisterForm } from './components/createcustomer';


function App() {

  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" exact element={<FrontPageView/>} />
          <Route path="/uutiset" element={<NewsView/>} />
          <Route path="/elokuvat" element={<AllMovies/>} />
          <Route path="/arvostelut" element={<MakeReview/>} />
          <Route path="/ryhmat" element={<Communities/>} />
          {/*<Route path="/ilmoitukset" element={<xxxx/>} />  näkyy vain kirjautuneille */}
          {/*<Route path="/asetukset" element={<xxxx/>} />  näkyy vain kirjautuneille */}
          {/* <Route path="/luokayttaja" element={<xxxx/>} /> */}
          <Route path="/kirjaudu" element={<LoginForm/>} />
        </Routes>

        {/* <NewsView /> */}
      </div>

    </Router>
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
