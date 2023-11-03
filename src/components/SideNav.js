import { Box, Card, IconButton,Paper,Stack, Tooltip } from '@mui/material'
import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import SocialDistanceIcon from '@mui/icons-material/SocialDistance';
import { useNavigate } from 'react-router-dom';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch } from 'react-redux';
import HistoryIcon from '@mui/icons-material/History';
const SideNav = ({setAuth}) => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const handleHome=()=>{
    navigate('/')
  }
  const handleMatching=()=>{
    navigate('/matchmaking')
  }
  const handleHistory=()=>{
    navigate('/recentmatches')
  }
  const handleMatchmaking=()=>{
    navigate('/matchmaking')
  }
  const handleLogout=()=>{
    // navigate('/login')
    localStorage.setItem('auth', 'false');
    setAuth(false)
    
  }
  return (
    <Paper >
        <Stack sx={{flex:1,position:'fixed',justifyContent:'center',textAlign:'center',height:'100vh'}} gap={3}>
        <Tooltip title="Home" placement="right-start" arrow>
            <IconButton onClick={handleHome} color='white'>
                <HomeIcon color='info'/>
            </IconButton>
        </Tooltip>
        <Tooltip title="Matching Area" placement="right-start" arrow>
        <IconButton color='white' onClick={handleMatching}>
            <SocialDistanceIcon color='info'/>
        </IconButton>
        </Tooltip>
        {/* <Tooltip title="On going Mentorships" placement="right-start" arrow>
        <IconButton color='white' onClick={handleAllUsers}>
            <PeopleAltIcon color='info'/>
        </IconButton>
        </Tooltip> */}
        <Tooltip title="Recent Matches" placement="right-start" arrow>
        <IconButton color='white' onClick={handleHistory}>
            <HistoryIcon color='info'/>
           
        </IconButton>
        </Tooltip>
        <Tooltip title="Logout" placement="right-start" arrow>
        <IconButton color='white' onClick={handleLogout}>
            <LogoutIcon color='info'/>
        </IconButton>
        </Tooltip>
       
        
    </Stack>
    </Paper>
  )
}

export default SideNav