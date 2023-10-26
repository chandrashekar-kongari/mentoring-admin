import React, { useEffect, useState } from 'react'
import DD from './components/DD'

import { CircularProgress, FormLabel, Stack } from '@mui/material';
import DD2 from './components/DD2';
import Match from './components/Match';
import Mentees from './components/Mentees';
import Mentors from './components/Mentors';
import MentorsTable from './components/MentorsTable';
import MenteesTable from './components/MenteesTable';
import MakeMatch from './MakeMatch';
import { Route,Routes,Router } from 'react-router-dom';
import SideNav from './components/SideNav';
import Home from '@mui/icons-material/Home';
import HomePage from './components/HomePage';
import AllUsers from './components/AllUsers';
import OnGoingMentorships from './components/OnGoingMentorships';
import Login from './components/Login';
import MatchMaking from './components/matchmaking/MatchMaking';
const App = () => {

  const [auth,setAuth]=useState(false)
  useEffect(()=>{
    const data = localStorage.getItem('auth');
    console.log('local ',data)
    if(data=='true'){
      setAuth(true)
    }
    setLoading(false)
  },[])

  const [loading,setLoading]=useState(true)
  
  return (
    // <MakeMatch/>
    <>
    {loading?<CircularProgress/>:<>
    {auth==true?
      <>
      <SideNav setAuth={setAuth}/>
      <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/matching" element={<MakeMatch/>}/>
            <Route path="/ongoingmentorships" element={<OnGoingMentorships/>}/>
            <Route path="/matchmaking" element={<MatchMaking/>}/>
            
      </Routes>
      </>:<Login setAuth={setAuth}/>}</>}
    </>
  )
}
export default App