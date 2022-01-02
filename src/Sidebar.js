import { Avatar, IconButton } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import React, { useEffect, useState } from 'react';
import db from './firebase';
import './Sidebar.css';
import SidebarChat from './SidebarChat';


const Sidebar = () => {
    const [rooms, setRooms] = useState([])
    useEffect(() => {
        const unsubsciribe = db.collection('rooms').orderBy('timestamp','desc')
        .onSnapshot(snap=>{
            setRooms(
                snap.docs.map((doc)=>({
                    id:doc.id,
                    data:doc.data()
                }))
            )
         })
       return ()=>{
           unsubsciribe()
       }  

    }, [])
    return (
        <div className='sidebar'>
           <div className="sidebar__header">
               <Avatar src='https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light'/>
               <div className="sidebar__headerRight">
                   <IconButton> 
                       <DonutLargeIcon/>
                   </IconButton>
                   <IconButton> 
                       <MoreVertIcon/>
                   </IconButton>
                   <IconButton> 
                       <ChatIcon/>
                   </IconButton>
               </div>
             
           </div>
           <div className="sidebar__search">
                   <div className="sidebar__searchContainer">
                    <SearchOutlinedIcon/>
                    <input type="text" placeholder='Search or start new chat'/>
                   </div>
           </div>
           <div className="sidebar__chat">
               <SidebarChat addNewChat/>
            {
                rooms.map(room=>(
                    <SidebarChat
                        key={room.id}
                        id={room.id}
                        name={room.data.name}
                    />
                ))
            }
               
           </div>
        </div>
    )
}

export default Sidebar
