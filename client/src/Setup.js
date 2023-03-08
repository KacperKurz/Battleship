import "./App.css"
import {useState} from "react";
import axios from "axios";
import Turn from "./Turn";


function Setup(props){
    const [field,setField]=useState([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])
    const [button,setButton]=useState(<button disabled>Ready</button>)

    const handleClick = ()=>{
        setButton(<button onClick={handleClick} disabled>Ready</button>)
        axios.post('http://localhost:3030/',{id: props.id,
            player: props.player,
            board: field}).then((res)=>{
                console.log("got response")
            props.setter(<Turn id={props.id} player={props.player} board={field} setter={props.setter}/>)
        })
    }

    const countShips = (field) =>{
        let count=0
        field.map((e)=>{
            if (e===1){
                ++count
            }
        })
        return count
    }

    const changeButton = () =>{
        if (countShips(field)===31){
            setButton(<button onClick={handleClick}>Ready</button>)
        }
        else{
            setButton(<button onClick={handleClick} disabled>Ready</button>)
        }
    }





    const generateButtons = ()=>{
        let buttons=[]
        for (let i=0;i<100;++i){
            buttons.push(
                <button onClick={(e)=>{
                    if (e.target.style.backgroundColor!="blue"){
                        e.target.style.backgroundColor="blue"
                        let newField=field
                        newField[i]=1
                        setField(newField)
                        changeButton()
                    }
                    else {
                        e.target.style.backgroundColor = ""
                        let newField = field
                        newField[i] = 0
                        setField(newField)
                        changeButton()
                    }
                }}></button>
            )
        }
        return buttons
    }

    return <div>
        <div className={"main"}>Place your ships</div>
        <div className={"flex"}>
            <div className="grid">
                {generateButtons()}
            </div>
            <div className={"legend"}>Length:
                <ul>
                    <li>4*2 fields</li>
                    <li>3*3 fields</li>
                    <li>2*4 fields</li>
                    <li>1*6 fields</li>
                </ul>
            </div>
        </div>

        <div className={"confirm"}>{button}</div>
    </div>
}

export default Setup

//TODO:prevent additional clicks