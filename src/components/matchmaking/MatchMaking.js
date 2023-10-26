import React, { useEffect, useState } from 'react'
import DisplayCard from '../DisplayCard'
import Carousel from 'react-material-ui-carousel'
import { Typography,Button,Container, Stack, Table, TableBody,TableHead, TableCell, TableRow, Box, Card, Modal, Alert } from '@mui/material'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import endpoint from '../../API/api';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
const MatchMaking = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [changes,setChanges]=useState(1)

  const [zerousers,setZeroUsers]=useState(false)
  const [zerousersmessage,setZeroUsersMessage]=useState('Meassage')


  const getData=async()=>{
    try {
      const response = await axios.get(endpoint+'/posiblematchs');
      if (response.status === 200) {
        console.log('data got from server ',response.data)
        setMentees(response.data.mentees)
        setMentors(response.data.mentors)
        const menteeslen=response.data.mentees.length
        const mentorslen=response.data.mentors.length
        const ml=response.data.mentors
        const arr=[]
        console.log('len me mo ',menteeslen,mentorslen)
        //mentoractiveidlist
        const allidslist=[]

        console.log('mentees len ',menteeslen)
        console.log('mentors len ',response.data.mentors)
        
        if(mentorslen==1){
          const menlen=response.data.mentors[0].length
          if(menlen==0){
            setZeroUsers(true)
            setZeroUsersMessage('Sufficient users not available to match')
            setLoading(false)
            return
          }
        }

        if(menteeslen==0 || mentorslen==0){
          setZeroUsers(true)
          setZeroUsersMessage('Sufficient users not available to match')
          setLoading(false)
          return
        }
        for(var i=0;i<mentorslen;i++){
            var il=ml[i]
            var illen=il.length
            // const idslist=[]
            // for (var j=0;j<illen;j++){
            //     idslist.push(
            //         {
            //             id:0
            //         }
            //     )
            // }
            allidslist.push({id:0})

        }
        setMentorsactiveidslist(allidslist)
        if(menteeslen>=mentorslen){
          

          for (let i = 1; i <= menteeslen; i++) {
            arr.push({'id':i})
          }
          
        }
        else{
          for (let i = 1; i <= mentorslen; i++) {
            arr.push({'id':i})
          }
        }
        setIds(arr)
        setLoading(false)

      }else{

      }
  }
  
  catch(error){
    console.log('err ',error)
  }
    const mentees=''
  }
  const [ids,setIds]=useState([])
  useEffect(()=>{
    console.log('changes made')
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

    const handleCarouselChange = (index,ind) => {
        const updatedSS = [...mentoractiveidlist];
    
        // Update the 'id' of the dictionary at index 1 to 4
        updatedSS[index].id = ind;
    
        // Update the state
        setMentorsactiveidslist(updatedSS);
        console.log(mentoractiveidlist);
      };
      const onClickYes=()=>{
    
        setLoading(true)
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
    
          const response = await axios.post(endpoint+'/makematch',matchids);
          if (response.status === 200) {
            console.log('data got from server ',response.data)

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
            const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;

            const a=8
            setChanges(randomNum)
            handleClose()
           
            setLoading(false)
            handleShowAlert(true)
            
    
          }else{
    
          }
      }
      catch(error){
        console.log('err ',error)
      }
      }
      const onMatch=(id)=>{
        // const filteredMentees = mentees.filter((mentee) => mentee.id != id);
        setModelIndex(id)
        const mtee=mentees[id]
        setMatchedmentee(mtee)
        const index=mentoractiveidlist[id].id

        const mtor=mentors[id][index]
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

    <Stack>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure, you want to match
          </Typography>
          <Stack flexDirection={'row'} gap={2}>
          {loading?<CircularProgress sx={{position:'fixed',top:'50%',left:'50%'}}/>:<>

          
            <Card elevation={5} sx={{width:'300px'}}><DisplayCard c={'white'} data={matchedmentee}/></Card>
            {mentees.length==0 ?<></> : <Card sx={{width:'300px'}} elevation={5}><DisplayCard c={'white'}  data={matchedmentor}/></Card>}
            </>}
          </Stack>

          <Button onClick={onClickYes} variant='contained' sx={{marginTop:'1rem',float:'right'}}>Yes</Button>
        </Box>
      </Modal>

        <Container>
        <Stack sx={{flex:1,flexDirection:'row',justifyContent:'center'}}>
        {showAlert && <Alert severity={alertType} onClose={()=>{handleShowAlert(false)}} sx={{position:'absolute',top:'2%'}} >{alertMeassage}</Alert>}
        </Stack>
            {loading==true?<CircularProgress sx={{position:'fixed',top:'50%',left:'50%'}}/>:<>
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
                        <DisplayCard key={mentee.id} data={mentee} c={'white'}/>
                        </TableCell>
                        </TableRow>
                })}
                

                    </TableBody>
                </Table>
                <Table sx={{ maxWidth: 650 }} aria-label="simple table">
                <TableHead >
                    <TableRow>
                        
                        <TableCell align="center">Actions</TableCell>
                        
                        
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {mentees.map((mentee,index)=>{
                        return <TableRow>
                            <TableCell component="th" scope="row" align="center"> 
                            <Button variant="contained" startIcon={<ArrowLeftIcon/>} endIcon={<ArrowRightIcon />} onClick={()=>{onMatch(index)}}>Match</Button>
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
                {mentors.map((mentorlist,index)=>{
        return <TableRow>
        <TableCell component="th" scope="row"  > 
        <Card elevation={5}>
            <Carousel
            onChange={(ind)=>{handleCarouselChange(index,ind)}}
            navButtonsProps={{          
            style: { 
                opacity:0.3
            }
        
        }} indicatorContainerProps={{
            style:{
                // backgroundColor:'white',
                // elevation:0
            }
        }}
        sx={{elevation:8}}
        indicators={false} autoPlay={false} navButtonsAlwaysVisible={true} animation='slide' duration='900'>
                {
                    mentorlist.map( (mentor, i) => <DisplayCard data={mentor} c={'white'} /> )
                }
            </Carousel>
        </Card>
        </TableCell>
                        </TableRow>
    })}
                

                    </TableBody>
                </Table>

            </Stack></>}</>}

        </Container>

    </Stack>
    
    // </div>
  )
}

export default MatchMaking