import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import axios from 'axios';


function App() {
  return (
    <div>
      <LoginForm />

    </div>
  );
}

function LoginForm() {

  const [username, setUsername] = useState('');
  const [pw, setpw] = useState('');

  function login() {
    axios.postForm('http://localhost:3001/customer/login', { username, pw })
      .then(resp => console.log(resp.data))
      .catch(error => console.log(error.message))
  }
  //const buttonlabel = islogin ? 'Kirjaudu ulos' : 'Kirjaudu sisään';
  const buttonlabel = 'Kirjaudu sisään';

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
