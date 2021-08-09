import { Avatar, IconButton } from '@material-ui/core';
import { DateRange } from '@material-ui/icons';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Chat.css';
import db from './firebase';
const Chat = () => {
    const [input, setInput] = useState("")
    const [seed, setSeed] = useState('')
    const {roomId}= useParams()
    const [roomName, setRoomName] = useState("")
    const [messages, setMessages] = useState([])

    useEffect(() => {
        if (roomId) {
            db.collection('rooms').doc(roomId)
            .onSnapshot(snap=>{
                setRoomName(snap.data().name)
            })
            
            db.collection('rooms').doc(roomId)
            .collection("messeges").orderBy('timestamp','acs')
            .onSnapshot(snap=>{
                setMessages(snap.docs.map((doc)=>doc.data()))
            })
        }
    }, [roomId])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [roomId])
    // console.log(messages)
    const sendMessage=(e)=>{
        e.preventDefault()
        console.log("console",input)
        setInput("")

    }
    return (
        <div className='chat'>
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>Last seen at..</p>
                </div>
                <div className="chat__headerRight">
                   <IconButton> 
                     <SearchOutlinedIcon/>
                   </IconButton>
                   <IconButton> 
                       <AttachFileIcon/>
                   </IconButton>
                   <IconButton> 
                       <MoreVertIcon/>
                   </IconButton>
                </div>
            </div>
            <div className="chat__body">
                {messages.map(message=>(
                    <p className={`chat__message ${true&& 'chat__reciver'}`}>
                        <span className='chat__name'>{message.name}</span>
                        {message.message}
                        <span className="chat__timestamp">
                            {new Date(message.timestamp?.toDate()).toUTCString()}
                        </span>
                    </p>    

                ))}
            </div>
            <div className="chat__footer">
                <InsertEmoticonIcon/>
                <form action="">
                    <input value={input} onChange={(e)=>setInput(e.target.value)} type="text" placeholder='Type message'/>
                    <button type="submit" onClick={sendMessage}>Send a message</button>
                </form>
                <MicIcon/>
            </div>
            
        </div>
    )
}

export default Chat
