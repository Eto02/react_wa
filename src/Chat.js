import { Avatar, IconButton } from '@material-ui/core';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './Chat.css';
import db from './firebase';
import firebase from 'firebase';
const Chat = () => {
    const [input, setInput] = useState("")
    const [seed, setSeed] = useState('')
    const {roomId}= useParams()
    const [roomName, setRoomName] = useState("")
    const [messages, setMessages] = useState([])
    const user = useSelector(state => state.user)

    useEffect(() => {
        if (roomId) {
            db.collection('rooms').doc(roomId)
            .onSnapshot(snap=>{
                if(snap.exists){
                    setRoomName(snap.data().name)
                }
              
            })
            db.collection('rooms').doc(roomId)
            .collection("messages").orderBy('timestamp')
            .onSnapshot(snap=>{
                setMessages(snap.docs.map((doc)=>({
                    id:doc.id,
                    data: doc.data()
                })))
            })
        }
    }, [roomId])
    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [roomId])
    
    const sendMessage=  (e)=>{
        e.preventDefault()
        console.log("console",input)
      
        db.collection('rooms').doc(roomId)
        .collection('messages').add({
            message:input,
            name:user.displayName,
            timestamp:firebase.firestore.Timestamp.fromDate(new Date())

        })
        .then((res)=>{
            db.collection('rooms').doc(roomId).set({
                name:roomName,
                timestamp:firebase.firestore.Timestamp.fromDate(new Date())
            })
        })
        .catch((err)=>console.log(err))
  
        setInput("")

    }
    return (
        <div className='chat'>
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    {
                        new Date(
                            messages[messages.length-1]?.timestamp?.toDate()
                        ).toUTCString()
                    }
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
                    <p key={message.id}className={`chat__message ${message.data.name ===user.displayName && 'chat__reciver'}`}>
                        <span className='chat__name'>{message.data.name}</span>
                        {message.data.message}
                        <span className="chat__timestamp">
                            {new Date(message.data.timestamp?.toDate()).toUTCString()}
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
