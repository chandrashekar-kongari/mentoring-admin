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
import RecentHistory from './components/history/RecentHistory';
import PdfViewer from './components/PdfViewer';
import {useSelector} from 'react-redux'
import SignUp from './components/SignUp';
import { PrivateRoutes } from './components/PrivateRoutes';
import MailSystem from './components/MailSystem';
import ManualMatch from './components/ManualMatch';
import RecentHistory2 from './components/history/RecentHistory2';
const App = () => {

  const [auth,setAuth]=useState(false)
  const resid=useSelector(state=>state.resid)
  useEffect(()=>{
   
  },[])

  const [loading,setLoading]=useState(true)
  
  return (

    <>

      
      <Routes>
      <Route element={<PrivateRoutes/>}>

            <Route path="/homepage" element={<HomePage/>}/>
            {/* <Route path="/matching" element={<MakeMatch/>}/>
            <Route path="/ongoingmentorships" element={<OnGoingMentorships/>}/> */}
            <Route path="/matchmaking" element={<MatchMaking/>}/>
            <Route path="/recentmatches" element={<RecentHistory2/>}/>
            <Route path='/viewresume/:resid' element={<PdfViewer  />}/>
            <Route path='/mail-system' element={<MailSystem/>}/>
            <Route path='/manual-match' element={<ManualMatch/>}/>
            <Route path="/allusers" element={<AllUsers/>}/>
        </Route>
            <Route path="/" element={<Login/>}/>
            <Route path='/signup' element={<SignUp/>}/>
               
      </Routes>
  
      
 </>
  )
}
export default App