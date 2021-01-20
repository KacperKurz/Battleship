import { useState } from "react"
import Setup from "./Setup"

function Game(props){
    const [view,setView]=useState()
    if (view===undefined){
        setView(<Setup id={props.id} player={props.player} setter={setView}/>)
    }
    return view
}

export default Game