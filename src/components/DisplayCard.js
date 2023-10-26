import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, Chip, IconButton, Stack } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import './displayCard.css'
import Link from '@mui/material/Link';
export default function DisplayCard({c,data}) {

  const [ints,setInts]=React.useState([])
  const [skills,setSkills]=React.useState([])

  React.useEffect(()=>{
    if(data.mentor=='true'){
      const i=data.mentorIntrests
      setInts(i)
      
    }else{
      const i=data.mentorshipIntrests
      setInts(i)
    }
    const s=data.skills
      setSkills(s)
    

  },[])
  return (
    <Card sx={{ maxWidth: 350 ,backgroundColor:c,padding:'1rem',margin:'0px',height:'230px'}} elevation={5}>
      
      <CardContent sx={{padding:'0px',margin:'0px'}}>
        <Stack flexDirection={'row'} sx={{justifyContent:'space-between'}}>
            <Box>
            <Typography gutterBottom variant="h6" sx={{fontSize:'14px',fontWeight:'bold'}} component="div">
                {data.firstname}
            </Typography>
            </Box>
            <Box>
                <IconButton size='small'>
                    <DocumentScannerIcon size='small'/>
                </IconButton>
            </Box>
            <Box>
              <Link href={data.linkedinProfile} target="_blank"><LinkedInIcon size='small'/></Link>
                {/* <IconButton size='small'>
                <LinkedInIcon size='small'/>
                </IconButton> */}
            </Box>
        </Stack>
        <Typography variant="p"  className="block-ellipsis" color="text.secondary" sx={{lineHeight:1.5}}>
          {data.additionalInformation}
        </Typography>
        <Typography sx={{fontSize:'12px',paddingTop:'2px'}}>
            Interests
        </Typography>
        <Box >
          {ints.map((int)=>{
            return <Chip label={int.title}  size="small" sx={{margin:'3px',fontSize:'10px',color:'white',backgroundColor:'black'}}/>
          })}
            
            
        </Box>
        <Typography sx={{fontSize:'12px',paddingTop:'2px'}}>
            Skills
        </Typography>
        <Box sx={{padding:'0px',margin:'0px'}}>
        {skills.map((sk)=>{
            return <Chip label={sk.title} size="small" sx={{margin:'3px',fontSize:'10px',color:'white',backgroundColor:'black'}}/>
          })}
        </Box>
      </CardContent>
     
    </Card>
  );
}