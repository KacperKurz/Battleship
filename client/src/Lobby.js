import React, {useState} from 'react'
import Game from './Game.js'
import Spectate from "./Spectate";
const axios = require('axios');


function Lobby(props){
    
    const [games,setGames] = useState([])
    const [popup,setPopup] = useState()


    const  getIds = ()=>{
        axios.get('http://192.168.0.6:3030/').then(res=>{
        setGames(res.data)
    })
    }

    if (games===[]){
        getIds()
    }

    const joinGame = (id,player) =>{
        axios.post('http://192.168.0.6:3030/join/'+id,{
            player: player
        })
        props.setter(<Game id={id} player={player}/>)
        props.idSetter(id)
    }

    const spectateGame = id=>{
        props.setter(<Spectate id={id}/>)
    }

    const clickJoin = (id)=>{
        axios.get('http://192.168.0.6:3030/'+id).then(res=>{
            let button1
            let button2

            if (typeof res.data[1] != "undefined" && !Object.keys(res.data[1]).length)
            {
                button1=<button onClick={()=>joinGame(id,1)} disabled>player 1</button>
            }
            else{
                button1=<button onClick={()=>joinGame(id,1)}>player 1</button>
            }
            if (typeof res.data[2] != "undefined" && !Object.keys(res.data[2]).length){
                button2=<button onClick={()=>joinGame(id,2)} disabled>player 2</button>
            }
            else{
                button2=<button onClick={()=>joinGame(id,2)}>player 2</button>
            }
        setPopup(<div>
            {button1}
            {button2}
            <button onClick={()=>spectateGame(id)}>spectate</button>
            <button onClick={()=>setPopup()}>close</button>
        </div>)
    })
    }

    const display = games.map(id=>{
        return <div id="game">
            <button onClick={()=>clickJoin(id)}>Join</button>
        </div>
    })



    return<>
    <button onClick={()=>{axios.post('http://192.168.0.6:3030/new'); getIds()}}>New room</button>
    {display}
    {popup}
    </>
}

export default Lobby