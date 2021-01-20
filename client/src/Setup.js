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
            props.setter(<Turn id={props.id} player={props.player} filed={field} setter={props.setter}/>)
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
        <div className="grid">
            {generateButtons()}
        </div>
        {button}
    </div>
}

export default Setup