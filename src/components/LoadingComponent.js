import React from 'react';
import { Box, CircularProgress, Container } from '@mui/material';
import './loading.css'
import BeatLoader from "react-spinners/BeatLoader";
const LoadingComponent = ({loading}) => {
  return (
    <>
    {loading &&<> <Box
      sx={{
        zIndex:'1',
        
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'white',
        position:'absolute',
        opacity:'0.5',
        width:'90%',
        height: '100vh', // 100% viewport height
      }}
    >
      <Box >
      
      </Box>
    </Box>
    <Box
      sx={{
        
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex:'1',
        
        position:'absolute',
        opacity:'1',
        width:'90%',
        height: '100vh', // 100% viewport height
      }}
    >
      <Box >
      <BeatLoader
  color="#014ABF"
  speedMultiplier={3}
  
  size={20}
/>
      {/* <DotLoader
  color="#014ABF"
  speedMultiplier={4}
/> */}
      </Box>
    </Box></>}
    </>
    
  );
};

export default LoadingComponent;
