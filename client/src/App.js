import { useState } from 'react';
import './App.css';
import './Lobby.js';
import Lobby from './Lobby.js';
import Game from './Game.js'

function App() {
  const [view,setView]=useState()
  if (view===undefined){
    setView(<Lobby setter={setView}/>)
  }
  return <>
    <nav>
      <h1>Battleship</h1>
      <button>Main lobby</button>
    </nav>
    {view}
  </>
}

export default App;
