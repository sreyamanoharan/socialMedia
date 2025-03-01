import { useState } from 'react'
import './App.css'
import Register from './Components/Register'
import Login from './Components/Login'
import {Route,Routes,BrowserRouter as Router} from 'react-router-dom'
import Feed from './Components/feed'
import UserProfile from './Components/UserProfile'



const userId = localStorage.getItem("userId");

function App() {


  return (
    <>
   <Router>
   <Routes>
    <Route path='/register' element={<Register/>}/>
    <Route path='/' element={<Login/>}/>
    <Route path="/feed" element={<Feed />} />
    <Route path="/my-posts" element={<Feed userId={userId} />} />
     <Route path='/profile' element={<UserProfile/>}/>

   </Routes>
  </Router>
    </>
  )
}

export default App
