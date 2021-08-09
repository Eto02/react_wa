import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import db from './firebase'
import './SidebarChat.css'

const SidebarChat = ({id, name, addNewChat}) => {
    const [seed, setSeed] = useState('')
    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [])

    const createChat =()=>{
        const roomName = prompt("Please enter name for chat")
        if (roomName) {
            db.collection('rooms').add({
                name:roomName
            })
        }
    }

    return !addNewChat? (
        <Link to={`/app/${id}`}>
        <div className='sidebarChat'>
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
            <div className="sidebarChat__info">
                <h2>{name}</h2>
                <p>This is the last message</p>
            </div>
        </div>
        </Link>
    ):(
        <div className='sidebarChat' onClick={createChat}>
            <h2>Add New Chat</h2>
        </div>
    );
}

export default SidebarChat
