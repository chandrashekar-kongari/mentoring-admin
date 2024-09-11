import React, { useEffect, useState } from 'react'
import DisplayCard from '../DisplayCard'
import Carousel from 'react-material-ui-carousel'
import { Typography,Button,Container, Stack, Table, TableBody,TableHead, TableCell, TableRow, Box, Card, Modal, Alert } from '@mui/material'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import endpoint from '../../API/api';
import AlertComponent from '../AlertComponent';
import LoadingComponent from '../LoadingComponent';
import TopAppBar from '../TopAppBar';
import { useNavigate } from 'react-router-dom';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
const RecentHistory2 = () => {
  

  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [changes,setChanges]=useState(1)

  const [zerousers,setZeroUsers]=useState(false)
  const [zerousersmessage,setZeroUsersMessage]=useState('Meassage')

  const updateStatesWithId=(index,ind)=>{
   
    const menteesdata=mentees
    const mentorsdata=mentors
    const menteesInts=mentees[index].mentorshipIntrests;
    const mentorInts = mentorsdata[index][ind].mentorIntrests;

    const menteesSkills = menteesdata[index].skills;
      const mentorSkills = mentorsdata[index][ind].skills;
      if (menteesdata[index]) {
        menteesdata[index].skills.forEach(menteeSkill => {
        
          if (mentorSkills.some(matchingSkill => matchingSkill.title === menteeSkill.title)) {
            menteeSkill.color = 'success'; // Update the color
          }else{
            menteeSkill.color = 'default';
          }
        });
        menteesdata[index].mentorshipIntrests.forEach(menteeInt => {

          if (mentorInts.some(matchingI => matchingI.title === menteeInt.title)) {
            menteeInt.color = 'success'; // Update the color
          }else{
            menteeInt.color = 'default';
          }
        });
      }


      
    
     
      if (mentorsdata[index] && mentorsdata[index][ind]) {
        var numberofvaluesmatched=0
        mentorsdata[index][ind].skills.forEach(mentorSkill => {
          
          
          if (menteesSkills.some(matchingSkill => matchingSkill.title === mentorSkill.title)) {
            mentorSkill.color = 'success'; // Update the color
            numberofvaluesmatched=numberofvaluesmatched+1
          }else{
            mentorSkill.color = 'default';
          }
        });

        mentorsdata[index][ind].mentorIntrests.forEach(mentorI => {
          if (menteesInts.some(matchingI=> matchingI.title === mentorI.title)) {
            mentorI.color = 'success'; // Update the color
            numberofvaluesmatched=numberofvaluesmatched+1
          }else{
            mentorI.color = 'default';
          }
        });
        mentorsdata[index][ind].numberofvaluesmatched=numberofvaluesmatched
        mentorsdata[index][ind].totalnumberofvalues=menteesSkills.length+menteesInts.length
      }

      const md=menteesdata
      const mord=mentorsdata
      setMentees(prevArray =>md)
      setMentors(prevArray =>mord)

  }
  const updateStates = (menteesd,mentorsd) => {
    const menteesdata=menteesd
    const mentorsdata=mentorsd

    const len=menteesd.length

    for(var i=0;i<len;i++){
      const menteesSkills = menteesdata[i].skills;
      const mentorSkills = mentorsdata[i][0].skills;

      const menteesInts=menteesdata[i].mentorshipIntrests;
      const mentorInts = mentorsdata[i][0].mentorIntrests;
      if (menteesdata[i]) {
        menteesdata[i].skills.forEach(menteeSkill => {

          if (mentorSkills.some(matchingSkill => matchingSkill.title === menteeSkill.title)) {
            menteeSkill.color = 'success'; // Update the color
          }else{
            menteeSkill.color = 'default';
          }
        });
        menteesdata[i].mentorshipIntrests.forEach(menteeInt => {

          if (mentorInts.some(matchingI => matchingI.title === menteeInt.title)) {
            menteeInt.color = 'success'; // Update the color
          }else{
            menteeInt.color = 'default';
          }
        });
      }
    
     
      if (mentorsdata[i] && mentorsdata[i][0]) {
        var numberofvaluesmatched=0
        mentorsdata[i][0].skills.forEach(mentorSkill => {
          if (menteesSkills.some(matchingSkill => matchingSkill.title === mentorSkill.title)) {
            mentorSkill.color = 'success'; // Update the color
            numberofvaluesmatched=numberofvaluesmatched+1
          }else{
            mentorSkill.color = 'default';
          }
        });
        mentorsdata[i][0].mentorIntrests.forEach(mentorI => {
          if (menteesInts.some(matchingI=> matchingI.title === mentorI.title)) {
            mentorI.color = 'success'; // Update the color
            numberofvaluesmatched=numberofvaluesmatched+1
          }else{
            mentorI.color = 'default';
          }
        });
        mentorsdata[i][0].numberofvaluesmatched=numberofvaluesmatched
        mentorsdata[i][0].totalnumberofvalues=menteesSkills.length+menteesInts.length
      }

    }
    setMentees(menteesdata)
    setMentors(mentorsdata)
    
  };
  

  

  const getData=async()=>{

    const token=localStorage.getItem('token')
    const axiosConfig={
      headers:{
        Authorization:`Bearer ${token}`,
      },
    };
    try {
      const response = await axios.get(endpoint+'/recentmatches',axiosConfig);
      if (response.status === 200) {

        setMentees(response.data.mentees)
        setMentors(response.data.mentors)
        
        setLoading(false)

      }else{
        navigate('/')
      }
  }
  
  catch(error){
   
    navigate('/')
  }
    const mentees=''
  }
  const [ids,setIds]=useState([])
  useEffect(()=>{

    getData()
    
  },[changes])

  const [loading,setLoading]=useState(true)
    const [mentees,setMentees]=useState([
        // {
        //     id:1,
        //     firstname:'chadrashekar',
        //     skills:[
        //         {
        //             title:'java'
        //         },{
        //             title:'python'
        //         }
        //     ],
        //     linkedinProfile:'h',
        //     mentorshipIntrests:[
        //         {
        //             title:'python'
        //         },
        //         {
        //             title:'c'
        //         }
        //     ],
        //     additionalInformation:'my bio'
        // },
        // {
        //     id:2,
        //     firstname:'Kiran',
        //     skills:[
        //         {
        //             title:'java'
        //         },{
        //             title:'python'
        //         }
        //     ],
        //     linkedinProfile:'h',
        //     mentorshipIntrests:[
        //         {
        //             title:'python'
        //         },
        //         {
        //             title:'c'
        //         }
        //     ],
        //     additionalInformation:'Financial and business professional with over two decades of experience in the banking and investment industry'
        // }
    ])
    const [mentors,setMentors]=useState([
        // [
        //     {
        //         firstname:'chadrashekar',
        //         skills:[
        //             {
        //                 title:'java'
        //             },{
        //                 title:'python'
        //             }
        //         ],
        //         linkedinProfile:'h',
        //         mentorshipIntrests:[
        //             {
        //                 title:'python'
        //             },
        //             {
        //                 title:'c'
        //             }
        //         ],
        //         additionalInformation:'my bio'
        //     },
        //     {
        //         firstname:'chadrashekar',
        //         skills:[
        //             {
        //                 title:'java'
        //             },{
        //                 title:'python'
        //             }
        //         ],
        //         linkedinProfile:'h',
        //         mentorshipIntrests:[
        //             {
        //                 title:'python'
        //             },
        //             {
        //                 title:'c'
        //             }
        //         ],
        //         additionalInformation:'my bio'
        //     }
        // ],
        // [
        //     {
        //         firstname:'chadrashekar',
        //         skills:[
        //             {
        //                 title:'java'
        //             },{
        //                 title:'python'
        //             }
        //         ],
        //         linkedinProfile:'h',
        //         mentorshipIntrests:[
        //             {
        //                 title:'python'
        //             },
        //             {
        //                 title:'c'
        //             }
        //         ],
        //         additionalInformation:'my bio'
        //     },
        //     {
        //         firstname:'swe',
        //         skills:[
        //             {
        //                 title:'java'
        //             },{
        //                 title:'python'
        //             }
        //         ],
        //         linkedinProfile:'h',
        //         mentorshipIntrests:[
        //             {
        //                 title:'python'
        //             },
        //             {
        //                 title:'c'
        //             }
        //         ],
        //         additionalInformation:'Financial and business professional with over two decades of experience in the banking and investment industry'
        //     }
        // ]
    ])

    const [mentoractiveidlist,setMentorsactiveidslist]=useState([
        // {
        //     id:0
        // },
        // {
        //     id:0
        // }
    ])

    const navigate=useNavigate()
    const [color,setColor]=useState('success')
    const handleCarouselChange = (index,ind) => {
        const updatedSS = [...mentoractiveidlist];
    
        // Update the 'id' of the dictionary at index 1 to 4
        updatedSS[index].id = ind;
    
        // Update the state
        setMentorsactiveidslist(updatedSS);
        updateStatesWithId(index,ind)
        
      };
      const onClickYes=()=>{
    
        setLoading(true)
        handleClose()
        sendReqforMatch()
        
      }

      const sendReqforMatch=async()=>{
        try {
          const menteeId=matchedmentee['_id']
          const mentorId=matchedmentor['_id']
          const matchids={
            'menteeId':menteeId,
            'mentorId':mentorId
          }
          const token=localStorage.getItem('token')

          const axiosConfig={
            headers:{
              Authorization:`Bearer ${token}`,
            },
          };
          const response = await axios.post(endpoint+'/unmatch',matchids,axiosConfig);
          if (response.status === 200) {


            setAlertMeassage(response.data.message)
            setAlertType(response.data.type)
          
            // setMentees(response.data.mentees)
            // setMentors(response.data.mentors)
            // const filteredMentees = mentees.filter((mentee, index) => index !== id);
    
            // setMentees(filteredMentees)
    
            // const filteredMentors = mentors.filter((mentor,index) => index != id);
            // setMentors(filteredMentors)
    
            // const filteredIds = ids.filter((oneid,index) => index != id);
            // setIds(filteredIds)
            const min = 1;
            const max = 1000000;
            let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
            while(true){
              if(randomNum!=changes){
                break
              }
              randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
            }

            const a=8
            setChanges(randomNum)
            handleClose()
           
            setLoading(false)
           
            // window.location.reload();
            handleShowAlert(true)
            
    
          }else{
            navigate('/')
          }
      }
      catch(error){
        navigate('/')
      }
      }
      const onMatch=(id)=>{
        // const filteredMentees = mentees.filter((mentee) => mentee.id != id);
        setModelIndex(id)
        const mtee=mentees[id]
        setMatchedmentee(mtee)
        // const index=mentoractiveidlist[id].id

        const mtor=mentors[id]
        setMatchedmentor(mtor)
        handleOpen()
        
        // setLoading(false)
      }

      const [matchedmentee,setMatchedmentee]=useState({

      })
      const [matchedmentor,setMatchedmentor]=useState({

      })
    
      const [modelIndex,setModelIndex]=useState(0)

      const [showAlert,setShowAlert]=React.useState(false)
      const handleShowAlert=(val)=>{
        // const val=!showAlert
        setShowAlert(val)
      }

  const [alertMeassage,setAlertMeassage]=React.useState("Alert message")
  const [alertType,setAlertType]=React.useState('info')


  return (
    // <div>{mentees.map((mentee)=>{
    //     return <DisplayCard data={mentee} c={'white'}/>
    // })}
    // {mentors.map((mentorlist)=>{
    //     return <Carousel
    //     navButtonsProps={{          
    //       style: { 
    //           opacity:0.5
    //       }
    //   }} 
    //    indicators={false} navButtonsAlwaysVisible={true} animation='slide' duration='1200'>
    //         {
    //             mentorlist.map( (mentor, i) => <DisplayCard data={mentor} c={'white'}/> )
    //         }
    //     </Carousel>
    // })}


    <>
    <TopAppBar/>
    <Stack sx={{flexDirection:'row',justifyContent:'center',paddingTop:'1rem',paddingBottom:'1rem',backgroundColor:'#f7f7f7'}}>
    <Typography variant='h6' sx={{fontWeight:'bold'}}>Completed matches</Typography>
  </Stack>
    <Stack>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure, you want to unmatch
          </Typography>
          <Stack flexDirection={'row'} gap={2}>
          {loading?<LoadingComponent loading={loading}/>:<>

          
            <Card elevation={5} sx={{width:'440px'}}><DisplayCard c={'white'} data={matchedmentee}/></Card>
            {mentees.length==0 ?<></> : <Card sx={{width:'440px'}} elevation={5}><DisplayCard c={'white'}  data={matchedmentor}/></Card>}
            </>}
          </Stack>

          <Button onClick={onClickYes} variant='contained' color='error' sx={{marginTop:'1rem',float:'right'}}>Yes</Button>
        </Box>
      </Modal>

        <Container>
        <Stack sx={{flex:1,flexDirection:'row',justifyContent:'center'}}>
        {showAlert && <AlertComponent type={alertType} message={alertMeassage}/>}
        </Stack>
            {loading==true?<LoadingComponent loading={loading}/>:<>
            {zerousers?<Typography>{zerousersmessage}</Typography>:<><Stack flexDirection={'row'} sx={{flex:1}}>
                <Table sx={{ maxWidth: 650 }} aria-label="simple table">
                <TableHead >
                    <TableRow>
                        
                        <TableCell align="center">Mentees</TableCell>
                        
                        
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {mentees.map((mentee)=>{
                        return <TableRow>
                            <TableCell component="th" scope="row" > 
                        <DisplayCard key={mentee.id} data={mentee} c={color}/>
                        </TableCell>
                        </TableRow>
                })}
                

                    </TableBody>
                </Table>
                <Table sx={{ maxWidth: 250 }} aria-label="simple table">
                <TableHead >
                    <TableRow>
                        
                        <TableCell align="center">Actions</TableCell>
                        
                        
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {mentees.map((mentee,index)=>{
                        return <TableRow>
                            <TableCell component="th" scope="row" align="center"> 
                            <Button variant="contained" color='error' startIcon={<ArrowLeftIcon/>} endIcon={<ArrowRightIcon />} onClick={()=>{onMatch(index)}}>Un Match</Button>
                        </TableCell>
                        </TableRow>
                })}
                

                    </TableBody>
                </Table>
                <Table sx={{ maxWidth: 650 }} aria-label="simple table">
                <TableHead >
                    <TableRow>
                        
                        <TableCell align="center">Mentors</TableCell>
                        
                        
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {/* {mentees.map((mentee)=>{
                        return <TableRow>
                            <TableCell component="th" scope="row" > 
                        <DisplayCard key={mentee.id} data={mentee} c={'white'}/>
                        </TableCell>
                        </TableRow>
                })} */}
                {mentors.map((mentor,index)=>{
        return <TableRow>
        <TableCell component="th" scope="row"  > 
        <Card elevation={5} sx={{width:'440px',height:'330px'}}>
             <DisplayCard data={mentor} c={'white'} /> 
               
        </Card>
        </TableCell>
                        </TableRow>
    })}
                

                    </TableBody>
                </Table>

            </Stack></>}</>}

        </Container>

    </Stack>
    
     </>
  )
}

export default RecentHistory2