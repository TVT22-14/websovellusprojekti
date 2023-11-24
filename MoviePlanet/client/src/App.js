import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';


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
import { RegisterForm, openRegisterModal } from './components/createcustomer';
import { LoginForm, openModal } from './components/auth';
//___________________________________________________________

import {DeleteUser} from './components/settings';


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
          <Route path="/luokayttaja" element={<RegisterForm/>} /> 
          <Route path="/kirjaudu" element={<LoginForm/>} />
        </Routes>

        {/* <NewsView /> */}
      </div>
      <div>
        <DeleteUser /> {/* Poista käyttäjä nappi, tän voi siirtää sitten pois kun saadaan settings pohja*/}
      </div>

    </Router>

  );
}

export default App;
