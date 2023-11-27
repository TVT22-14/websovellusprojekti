import logo from './logo.svg';
import './App.css';


// IMPORTIT ROUTE LINKEILLE
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import NavBar from './components/navbar';

import FrontPageView from './components/frontpageview';
import NewsView from './components/news';
import AllMovies from './components/movies';
import MakeReview from './components/review';
import Communities from './components/communities';
//ilmoitukset tähän
import Settings from './components/settings';
import { RegisterForm, openRegisterModal } from './components/createcustomer';
import { LoginForm, openModal } from './components/auth';
//___________________________________________________________

import { jwtToken, LoginFormOpen, RegisterFormOpen} from './components/signals';
import React, { useState } from 'react';




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
          <Route path="/asetukset" element={<Settings/>} />  {/*näkyy vain kirjautuneille */}
          <Route path="/luokayttaja" element={<RegisterForm/>} /> 
          <Route path="/kirjaudu" element={<LoginForm/>} />
        </Routes>

        {/* <NewsView /> */}
      </div>

    </Router>

  );
}

export default App;
