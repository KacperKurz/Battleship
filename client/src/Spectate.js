import {useState} from "react";
import axios from "axios";

function Spectate(props){
    const [turn,setTurn]=useState("player1")
    const [turnDisplay,setTurnDisplay]=useState(<div className={"main"}>Player 1</div>)
    const [launch,setLaunch]=useState(true)
    const initialGuess=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]


    const generateBoard = (input)=>{
        let fields=[]
        input.map(state=>{
            switch (state){
                case 0:
                    fields.push(
                        <button className={"empty"} disabled></button>
                    )
                    break
                case 1:
                    fields.push(
                        <button className={"ship"} disabled></button>
                    )
                    break
                case 2:
                    fields.push(
                        <button className={"guessedEmpty"} disabled></button>
                    )
                    break
                case 3:
                    fields.push(
                        <button className={"guessedShip"} disabled></button>
                    )
                    break
            }
        })
        return fields
    }

    const turnSetter = ()=>{
        const curTurn=turn
        if (turn==="player1"){
            setTurn("player2")
        }
        else{
            setTurn("player1")
        }
        return <div className={"main"}>{curTurn==="player1"?"Player 1":"Player 2"}</div>
    }

    const [board1,setBoard1]=useState(generateBoard(initialGuess))
    const [board2,setBoard2]=useState(generateBoard(initialGuess))

    const playTurn = ()=>{
        axios.post("http://192.168.0.6:3030/spectate",{
            id: props.id
        }).then((res)=>{
            if (res.data==="Player 1 won!" || res.data==="Player 2 won!"){
                setTurnDisplay(<div className={"main"}>{res.data}</div>)
            }
            else{
                setTurnDisplay(turnSetter())
                setBoard1(generateBoard(res.data.player1.board))
                setBoard2(generateBoard(res.data.player2.board))
            }
            playTurn()
        })

    }

    if (launch){
        setLaunch(false)
        playTurn()
    }

    return  <>
        <div className={"main"}>
            {turnDisplay}
            <div className="flex">
                <div className="grid">
                    {board1}
                </div>
                <div className="grid">
                    {board2}
                </div>
                <div className={"legend"}>Legend:
                    <ul>
                        <li style={{color: "lightgray"}}>Empty field</li>
                        <li style={{color: "blue"}}>Your ship</li>
                        <li style={{color: "black"}}>Missed Ship</li>
                        <li style={{color: "red"}}>Hit Ship</li>
                    </ul>

                </div>
            </div>
        </div>
        <div className={"flex"}>
            <div className={"main"}>Player's 1 board</div>
            <div className={"main"}>Player's 2 board</div>
            <div></div>
        </div>
    </>
}

export default Spectate