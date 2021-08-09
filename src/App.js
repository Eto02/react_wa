import React from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import Chat from './Chat';
import Login from "./Login";
import Sidebar from './Sidebar';

function App() {
  const user = useSelector(state => state.user)
  console.log(user)
  return (
    <div className="app">
      {user?(
        <Login/>
      ):(
        <div className="app__body">
        <Router>
        <Sidebar/>
           <Switch>
             <Route path='/app/:roomId'>
               <Chat/>
             </Route> 
             <Route path='/' exact>
                 <h1>Home scren</h1>
             </Route>
           </Switch>
        </Router>
      
      </div>
    
      )}
    </div>
  );
}

export default App;
