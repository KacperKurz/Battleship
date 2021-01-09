import React, {useState} from 'react'
const axios = require('axios');


function Lobby(){
    
    const [games,setGames] = useState([])
    const [popup,setPopup] = useState()


    const  getIds = ()=>{
        axios.get('http://localhost:3030/').then(res=>{
        setGames(res.data)
    })
    }
    
    if (!games.length){
        getIds()
    }

    const joinGame = (id,player) =>{
        axios.post('http://localhost:3030/join/'+id,{
            player: player
        })
    }

    const clickJoin = (id)=>{
        axios.get('http://localhost:3030/'+id).then(res=>{
            let button1
            let button2
            if (typeof res.data[1] != "undefined" && !Object.keys(res.data[1]).length)
            {
                button1=<button onClick={()=>joinGame(id,1)} disabled>player 1</button>
            }
            else{
                button1=<button onClick={()=>joinGame(id,1)}>player 1</button>
            }
            if (typeof res.data[2] != "undefined" && !Object.keys(res.data[1]).length){
                button2=<button onClick={()=>joinGame(id,2)} disabled>player 2</button>
            }
            else{
                button2=<button onClick={()=>joinGame(id,2)}>player 2</button>
            }
        setPopup(<div>
            {button1}
            {button2}
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
    <button onClick={()=>{axios.post('http://localhost:3030/new'); getIds()}}>New room</button>
    {display}
    {popup}
    </>
}

export default Lobby