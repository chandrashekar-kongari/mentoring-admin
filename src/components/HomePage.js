import { Box, Container, Stack, Typography } from '@mui/material'
import React from 'react'
import SideNav from './SideNav'

import TopAppBar from './TopAppBar'

const HomePage = () => {
  return (
    <>

    <TopAppBar/>
    <Container>
      <Stack sx={{justifyContent:'center',flex:1,flexDirection:'row',paddingTop:'2rem'}}>
        <Box>
          <Typography sx={{fontWeight:'bold',fontSize:'18px'}}>Welcome to Admin Dashboard</Typography>
        </Box>
      </Stack>
      
    </Container>

    </>
  )
}

export default HomePage
