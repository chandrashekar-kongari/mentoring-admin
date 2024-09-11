import { Badge, Box, Card, CardContent, Chip, Container, Stack, Typography } from '@mui/material'
import React from 'react'
import Link from '@mui/material/Link';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
const UserCard = ({user}) => {
  return (
    
        
      
      
      <Card sx={{ minWidth: 275,m:2 ,minHeight: 175}}>
        <CardContent>
        <Badge color={user.mentor=='true'? "secondary":"warning"} anchorOrigin={{
    vertical: 'top',
    horizontal: 'right',
  }} badgeContent={user.mentor=='true'? "Mentor":"Mentee"}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {user.firstname} {' '}{user.lastname}
          </Typography>
         
          </Badge>
          <Stack>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {user.email} 
          </Typography>
          </Stack>
         
          <Box>
              {user.mentor=='true'? <Typography gutterBottom variant="h6" sx={{fontSize:'14px',}} component="div">Number of Mentees: {' '}{user.menteeslist.length} mentee(s)</Typography>:<Typography>Matched: {user.matched}</Typography>}
                  
              </Box>

              <Box>
              {user.linkedinProfile!='' && <Link href={user.linkedinProfile} target="_blank"><LinkedInIcon size='small'/></Link>}
                
            </Box>
          
         
         
        </CardContent>
  
      </Card>
   

  )
}

export default UserCard