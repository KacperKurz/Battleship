import {useState} from "react";
import axios from "axios";
import "./App.css"



function Turn(props){
    const [turn,setTurn]=useState(<div className={"main"} style={{color: "green"}}>Your turn</div>)
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

    const generateButtons = (input,disabled=false)=>{
        // console.log(guesses)
        let buttons=[]
        for (let i=0;i<100;++i){
            switch (input[i]){
                case 0:
                    buttons.push(
                        <button class={"empty"} disabled={disabled} onClick={()=>playTurn(i)}></button>
                    )

                    break
                case 1:
                    buttons.push(
                        <button class={"guessedEmpty"} disabled={true}></button>
                    )
                    break
                case 2:
                    buttons.push(
                        <button class={"guessedShip"} disabled={true}></button>
                    )
                    break
            }
        }
        return buttons
    }

    const [buttons,setButtons]=useState(generateButtons(initialGuess))
    const [disabledButtons,setDisabledButtons]=useState(generateButtons(initialGuess,true))
    const [boardDisplay,setBoardDisplay]=useState(generateBoard(props.board))
    const [disableButtons,setDisableButtons]=useState(false)

    const playTurn = (field)=>{
        setDisableButtons(true)
        setTurn(<div className={"main"} style={{color: "red"}}>Enemy turn</div>)
        axios.patch("http://localhost:3030/"+String(field),{
            id: props.id,
            player: props.player,
        }).then((res)=>{
            if (res.data==="You won!" || res.data==="You lost!"){
                setTurn(res.data)
            }
            else{
                setTurn(<div className={"main"} style={{color: "green"}}>Your turn</div>)
                setBoardDisplay(generateBoard(res.data.board))
                setButtons(generateButtons(res.data.guess))
                setDisabledButtons(generateButtons(res.data.guess,true))
                setDisableButtons(false)
            }

        })
    }




    return  <>
    <div className={"main"}>
        {turn}
        <div className="flex">
            <div className="grid">
            {disableButtons?disabledButtons:buttons}
            </div>
            <div className="grid">
                {boardDisplay}
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
        <div className={"main"}>Enemy's board</div>
        <div className={"main"}>Your board</div>
        <div></div>
    </div>
        </>

}

export default Turn