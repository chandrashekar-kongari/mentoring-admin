import React, { useEffect, useState } from 'react'
import DD from './components/DD'
import axios from 'axios';
import { Button, Container, FormLabel, Stack } from '@mui/material';
import DD2 from './components/DD2';
import Match from './components/Match';
import Mentees from './components/Mentees';
import Mentors from './components/Mentors';
import MentorsTable from './components/MentorsTable';
import MenteesTable from './components/MenteesTable';
import Modal from '@mui/material/Modal';
import { useDispatch,useSelector } from 'react-redux';
import { saveIds,saveMentees,saveMentors } from './features/AppSlice';
import DisplayCard from './components/DisplayCard';
import { Box,Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import endpoint from './API/api';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const MakeMatch = () => {
  const colors = [
    '#FFFFF0', '#FFFFE0', '#FFFAF0', '#FFFACD', '#FFF8DC', '#FFF0F5',
    '#FFE4E1', '#FFF5EE', '#F5F5DC', '#FAEBD7', '#FFEFD5', '#FFEBCD',
    '#FFE4B5', '#FFDAB9', '#EEE8AA', '#F0E68C', '#FFD700', '#FFF8DC',
    '#DAA520', '#f5aca4', '#c4f5a4', '#a4f5f3', '#d4e695', '#f5a4b4','#fc9888',
    '#fcab88','#fcc288','#fcdf88','#edfc88','#ccfc88','#a5fc88','#88fc9c','#88fcbf','#88fcf5','#88bffc'
  ];
  
  function getRandomColor() {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }
  const dispatch=useDispatch()

  const [ids,setIds]=useState([
    
  ])
  const [mentors,setMentors]=useState([
    {
      id:1,
      name:'Mentor1',
      index:0,
      c:getRandomColor()
    },
    {
      id:2,
      name:'Mentor2',
      index:1,
      c:getRandomColor()
      
    },
    {
      id:3,
      name:'Mentor3',
      index:2,
      c:getRandomColor()
    },
    {
      id:4,
      name:'Mentor4',
      index:3,
      c:getRandomColor()
    },
    {
      id:5,
      name:'Mentor5',
      index:4,
      c:getRandomColor()
    }
  ])
  const [mentees,setMentees]=useState([
    {
      id:1,
      name:'Mentee11',
      index:0,
      c:getRandomColor()
    },
    {
      id:2,
      name:'Mentee2',
      index:1,
      c:getRandomColor()
    },
    {
      id:3,
      name:'Mentee3',
      index:2,
      c:getRandomColor()
    },
    {
      id:4,
      name:'Mentee4',
      index:3,
      c:getRandomColor()
    }
  ])

  const getData=async()=>{
    try {
      const response = await axios.get(endpoint+'/alldata');
      if (response.status === 200) {
        console.log('data got from server ',response.data)
        setMentees(response.data.mentees)
        setMentors(response.data.mentors)
        const menteeslen=response.data.mentees.length
        const mentorslen=response.data.mentors.length
        const arr=[]
        console.log('len me mo ',menteeslen,mentorslen)
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
  

  useEffect(()=>{
    dispatch(saveIds(ids))
    // dispatch(saveMentees(mentees))
    dispatch(saveMentors(mentors))
    getData()
  },[])

  const onMatch=(id)=>{
    // const filteredMentees = mentees.filter((mentee) => mentee.id != id);
    setModelIndex(id)
    handleOpen()
    // sendReqforMatch(id)

    // const filteredMentees = mentees.filter((mentee, index) => index !== id);

    // setMentees(filteredMentees)

    // const filteredMentors = mentors.filter((mentor,index) => index != id);
    // setMentors(filteredMentors)

    // const filteredIds = ids.filter((oneid,index) => index != id);
    // setIds(filteredIds)


  }
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [loading,setLoading]=useState(true)
  

  const sendReqforMatch=async(id)=>{
    try {
      const menteeId=mentees[id].id
      const mentorId=mentors[id].id
      const matchids={
        'menteeId':menteeId,
        'mentorId':mentorId
      }

      const response = await axios.post(endpoint+'/makematch',matchids);
      if (response.status === 200) {
        console.log('data got from server ',response.data)
        // setMentees(response.data.mentees)
        // setMentors(response.data.mentors)
        const filteredMentees = mentees.filter((mentee, index) => index !== id);

        setMentees(filteredMentees)

        const filteredMentors = mentors.filter((mentor,index) => index != id);
        setMentors(filteredMentors)

        const filteredIds = ids.filter((oneid,index) => index != id);
        setIds(filteredIds)
        handleClose()
        setLoading(false)
        

      }else{

      }
  }
  catch(error){
    console.log('err ',error)
  }

  }
  const onClickYes=()=>{
    
    setLoading(true)
    sendReqforMatch(modelIndex)
  }

  const [modelIndex,setModelIndex]=useState(0)

  const [modelMenteeColor,setModelMenteeColor]=useState('white')
  
  
  return (
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
            <DisplayCard c={'white'} data={mentors[modelIndex]}/>
            {mentees.length==0 ?<></> : <DisplayCard c={mentees[modelIndex].color}  data={mentees[modelIndex]}/>}
            </>}
          </Stack>

          <Button onClick={onClickYes} variant='contained' sx={{marginTop:'1rem',float:'right'}}>Yes</Button>
        </Box>
      </Modal>
      {loading?<CircularProgress sx={{position:'fixed',top:'50%',left:'50%'}}/>:<Container>
        <Stack flexDirection={'row'}>
        {mentors && <MentorsTable mentors={mentors} setMentors={setMentors} />}
          <Match onMatch={onMatch} ids={ids} setIds={setIds}/>
          {mentees.length==0 ?<></> : <MenteesTable mentees={mentees} setMentees={setMentees} onMatch={onMatch}/>}
        </Stack>
        
      </Container>}
    </Stack>
  )
}
export default MakeMatch