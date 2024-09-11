import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Avatar, Box, Chip, IconButton, Stack } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import './displayCard.css'
import { saveResid } from '../features/AppSlice';
import {useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';
import StarIcon from '@mui/icons-material/Star';
import { useState } from 'react';
export default function DisplayCard({c,data}) {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const handleResumeClick = (resid) => {
    // Change the route to /your-route and pass the message as a prop
    dispatch(saveResid(resid))
    // navigate('/viewresume')
    // window.open('/viewresume', '_blank');
  };

  const [ints,setInts]=React.useState([])
  const [skills,setSkills]=React.useState([])
  const handleSetResume=(resid)=>{
    
    dispatch(saveResid(resid))
  }
  const handleColorForPercentage=(mValues,tValues)=>{

    const per=(mValues/tValues)*100

    if(per>=80){
      return( '#05ed43')
    }else if(per>=60){
      return('#50fa7d')
    }
    else if(per>=40){
      return('#88f2a4')
    }else if(per>=20){
      return('#aff0c0')
    }
    return ('#dcf5e3')

  }
  const [percentageColor,setPercentageColor]=useState('blue')

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

      if(data.resume!=''){
        handleSetResume(data.resume)
      }

      handleColorForPercentage(data.numberofvaluesmatched,data.totalnumberofvalues)
    
    
  },[])
  return (
    <Card sx={{ width: 420 ,backgroundColor:c,padding:'1rem',margin:'0px',height:'19.625rem'}} elevation={5}>
      
      <CardContent sx={{padding:'0px',margin:'0px'}}>
        <Stack flexDirection={'row'} sx={{justifyContent:'space-between'}}>
            <Box>
            <Typography gutterBottom variant="h6" sx={{fontSize:'14px',fontWeight:'bold'}} component="div">
                {data.firstname}
            </Typography>
            </Box>
            <Box>
                {data.resume!='' &&
                  <Link href={`viewresume/${data.resume}`} target="_blank">
                    <DocumentScannerIcon size='small'/>
                  </Link>     
                }
            </Box>
            <Box>
            {data.linkedinProfile!='' && <Link href={data.linkedinProfile} target="_blank"><LinkedInIcon size='small'/></Link>}
                
            </Box>
            <Box>
            {data.mentor=='true' && <Typography gutterBottom variant="h6" sx={{fontSize:'14px',}} component="div"><Chip sx={{fontSize:'14px'}} size='small' label={data.menteeslist.length+' mentee(s)'}/></Typography>}
                
            </Box>
            <Box>
            {data.mentor=='true' && <Typography gutterBottom variant="h6" sx={{fontSize:'14px'}} component="div"><Chip sx={{fontSize:'14px',backgroundColor:`${handleColorForPercentage(data.numberofvaluesmatched,data.totalnumberofvalues)}`}}  icon={<StarIcon />} size='small'   label={((data.numberofvaluesmatched/data.totalnumberofvalues)*100).toFixed(2)+'%'}/></Typography>}
                
            </Box>
            
        </Stack>
        <Box>
            <Typography gutterBottom variant="h6" sx={{fontSize:'14px',fontWeight:'bold'}} component="div">
                {data.email}
            </Typography>
            </Box>

        <Stack>

          <Box>
          {data.mentor=='true' && <Typography gutterBottom variant="h6" sx={{fontSize:'14px'}} component="div"><span style={{fontWeight:'bold'}}>Organization:</span> {data.organization}</Typography>}
          {data.mentor=='true' && <Typography gutterBottom variant="h6" sx={{fontSize:'14px'}} component="div"><span style={{fontWeight:'bold'}}>Title:</span> {data.title}</Typography>}
          {data.mentee=='true' && 
          (Object.entries(data.education).map(([key, value]) => (
            <li key={key}>
              <strong style={{textTransform:'capitalize'}}>{key}:</strong> {value}
            </li>
          )))}
          
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
            return <Chip label={int.title}  size="small" sx={{margin:'3px',fontSize:'10px'}} />
          })}
            
            
        </Box>
        <Typography sx={{fontSize:'12px',paddingTop:'2px'}}>
            Skills
        </Typography>
        <Box sx={{padding:'0px',margin:'0px'}}>
        {skills.map((sk)=>{
            return <Chip label={sk.title} size="small" sx={{margin:'3px',fontSize:'10px'}} />
          })}
        </Box>
      </CardContent>
     
    </Card>
  );
}