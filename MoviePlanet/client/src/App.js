import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import axios from 'axios';
import { jwtToken } from './components/signals';


// Tässä esimerkki miten signaalia voi käyttää
// Jos jwtToken on tyhjä, näytetään login form
// Jos taas jwtToken ei ole tyhjä, vaan käyttäjä on kirjautunut sisään näytetään kirjaudu ulos nappi, eikä formia ollenkaan.
function App() {
  return (
    <div>
      <UserInfo />
      {jwtToken.value.length === 0 ? <LoginForm /> : <button onClick={()=>jwtToken.value = ''}> Kirjaudu ulos </button>}

    </div>
  );
}

// Tämä vain että voi demostroida, että signaali toimii
function UserInfo(){
  return(
    <div>
      {jwtToken.value ? <h1> Kirjautunut sisään </h1> : <h1> Kirjautunut ulos </h1>} 
    </div>
  );  
}

function LoginForm() {

  const [username, setUsername] = useState('');
  const [pw, setpw] = useState('');

  function login() {
    axios.postForm('http://localhost:3001/customer/login', { username, pw })
      .then(resp => jwtToken.value = resp.data.jwtToken) // Asetetaan tokenin signaaliin
      .catch(error => console.log(error.response.data))
  }

  return (
    <div>
      <label>Käyttäjätunnus: </label>
      <input value={username} onChange={e => setUsername(e.target.value)} /> <br></br>
      <label>Salasana: </label>
      <input value={pw} onChange={e => setpw(e.target.value)} /> <br></br>
      <button onClick={login}> Kirjaudu sisään </button>
    </div>
  );
}

export default App;
