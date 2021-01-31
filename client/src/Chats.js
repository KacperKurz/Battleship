import {useState} from "react";
import PrivateChat from "./PrivateChat";
import PublicChat from "./PublicChat";

function Chats(props){
    const [floatingWindow,setFloatingWindow] = useState(false)
    const [selectedChat, setSelectedChat] = useState("pc")


    const spawnChats = () =>{
        if (floatingWindow) setFloatingWindow(false)
        else setFloatingWindow(true)
    }


    return <>
        <button onClick={()=>spawnChats()}>Chats</button>
        <div className={"floating"} style={{display: !floatingWindow?"none":""}}>
            <div className={"flex"}>
                <button onClick={()=>setSelectedChat("pc")}>Private chat</button>
                <button onClick={()=>setSelectedChat("gc")}>Public chat</button>
            </div>
            {<PrivateChat selected={selectedChat}/>}
            {<PublicChat selected={selectedChat} id={props.id}/>}
        </div>
        </>
}

export default Chats