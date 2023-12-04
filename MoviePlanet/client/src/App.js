import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

// IMPORTIT ROUTE LINKEILLE
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import NavBar from './components/navbar';

import FrontPageView from './components/frontpageview';
import NewsView from './components/news';
import AllMovies from './components/movies';
import AllReviews from './components/review';
import Communities from './components/communities';
//ilmoitukset tähän
import Settings from './components/settings';
import { RegisterForm, openRegisterModal } from './components/createcustomer';
import { LoginForm, openModal } from './components/auth';
import { Communitypage } from './components/communitypage';

//___________________________________________________________

function App() {
  return (
    <Router>
      <div>
      <NavBar />
      <Routes>
        <Route path="/" exact element={<FrontPageView />} />
        <Route path="/uutiset" element={<NewsView />} />
        <Route path="/elokuvat" element={<AllMovies />} />
        {/* <Route path="/arvostelut" element={<MakeReview />} /> */}
        <Route path="/ryhmat" element={<Communities />} />
        {/*<Route path="/ilmoitukset" element={<xxxx/>} />  näkyy vain kirjautuneille */}
        <Route path="/asetukset" element={<Settings />} /> {/*näkyy vain kirjautuneille */}
        <Route path="/luokayttaja" element={<RegisterForm />} />
        <Route path="/kirjaudu" element={<LoginForm />} />
        <Route path="ryhma/:groupname" element={<Communitypage />} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;