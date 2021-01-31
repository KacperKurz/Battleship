import { useState } from 'react';
import './App.css';
import './Lobby.js';
import Lobby from './Lobby.js';
import Chats from "./Chats";

function App() {
  const [view,setView]=useState()
  const [id,idSetter]=useState()
  if (view===undefined){
    setView(<Lobby setter={setView} idSetter={idSetter}/>)
  }
  return <>
    <nav>
      <h1>Battleship</h1>
      <Chats id={id}/>
      <button>Main lobby</button>
    </nav>
    {view}
  </>
}

export default App;
