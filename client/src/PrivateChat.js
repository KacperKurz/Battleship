import {useState} from "react";
const mqtt = require("mqtt")




function PrivateChat(props){
    const [text,setText] = useState("")
    const [messages,setMessages] = useState([])
    const [client,setClient] = useState()
    const [listen,setListen] = useState(true)
    const [nick,setNick] = useState()
    const [target,setTarget] = useState()



    if (client===undefined){
        setClient(mqtt.connect('mqtt://192.168.0.6:8000/'))
    }



    if (client&&listen){
        setListen(false)
        client.on('connect', function () {
            client.subscribe('private', function (err) {
                if (!err) {
                    console.log("connected")
                }
                else{
                    console.log(err)
                }
            })
        })
        client.on('message', function (topic, message) {
            // console.log(message.toString().split('→')[0])
            //
            // console.log(message.toString().split('→')[1].split('←')[0])
            //
            // console.log(message.toString().split('→')[0]===nick&&message.toString().split('→')[1].split('←')[0]===target)
            // console.log(message.toString().split('→')[0]===nick)
            // console.log(nick)
            // console.log(message.toString().split('→')[0])
            // console.log(readNick)
            // if (topic==="private"&&((message.toString().split('→')[0]===nick&&message.toString().split('→')[1].split('←')[0]===target)||message.toString().split('→')[1].split('←')[0]===nick)){
                console.log("im here")
                let temp=messages
                temp.push(<p>{message.toString().split('→')[0]}->{message.toString().split('→')[1].split('←')[0]}: {message.toString().split('←')[1]}</p>)
                setMessages(temp)
                setText("")
            // }
        })
    }

    const nickSetter = (e) =>{
        setNick(e.target.value)
    }

    const targetSetter = (e) =>{
        setTarget(e.target.value)
    }


    return <>
        <div style={{display: props.selected!=="pc"?"none":""}}>
            {messages}
        </div>
        <div className={"bottom"} style={{display: props.selected!=="pc"?"none":""}}>
                <input onChange={(e)=>setText(e.target.value)}/>
                <button onClick={()=>client.publish("private",nick+'→'+target+'←'+text)}>Send</button>
                <input placeholder={"Your nick"} onChange={e=>nickSetter(e)}/>
                <input placeholder={"To"} onChange={e=>targetSetter(e)}/>
        </div>
        </>
}

export default PrivateChat