import {useState} from "react";
const mqtt = require("mqtt")




function PublicChat(props){
    const [text,setText] = useState("")
    const [messages,setMessages] = useState([])
    const [client,setClient] = useState()
    const [listen,setListen] = useState(true)
    const [nick,setNick] = useState()



    if (client===undefined){
        setClient(mqtt.connect('mqtt://localhost:8000/'))
    }




    if (client&&listen){
        setListen(false)
        client.on('connect', function () {
            client.subscribe("public", function (err) {
                if (!err) {
                    console.log("connected")
                }
                else{
                    console.log(err)
                }
            })
        })
        client.on('message', function (topic, message) {
            let temp=messages
            temp.push(<p>{message.toString()}</p>)
            setMessages(temp)
            console.log(messages)
            setText("")
        })
    }

    const nickSetter = (e) =>{
        setNick(e.target.value)
    }



    return <>
        <div style={{display: props.selected!=="gc"?"none":""}}>
            {props.id===undefined?"Join game first":messages}
        </div>
        <div className={"bottom"} style={{display: props.selected!=="gc"?"none":""}}>
            <input onChange={(e)=>setText(e.target.value)}/>
            <button onClick={()=>{client.publish("public",nick+": "+text)}}>Send</button>
            <input placeholder={"Your nick"} onChange={e=>nickSetter(e)}/>
        </div>
    </>
}

export default PublicChat