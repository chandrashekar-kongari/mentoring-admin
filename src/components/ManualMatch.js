import React, { useState } from 'react'
import TopAppBar from './TopAppBar'
import { Box, Button, Card, Modal, Stack, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material'
import LoadingComponent from './LoadingComponent';
import DisplayCard from './DisplayCard';
import { useNavigate } from 'react-router-dom';
import endpoint from '../API/api';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';


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
const ManualMatch = () => {

    const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


    const [menteeEmailId,setMenteeEmailId]=useState('')
    const [mentorEmailId,setMentorEmailId]=useState('')

    const [mentor,setMentor]=useState()
    const [mentee,setMentee]=useState()

    const sendReqforMatch=async()=>{
      try {
        const menteeId=mentee['_id']
        const mentorId=mentor['_id']
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
        const response = await axios.post(endpoint+'/makematch',matchids,axiosConfig);
        if (response.status === 200) {

          callToast(response.data.message,response.data.type)
          setMenteeEmailId('')
          setMentorEmailId('')
        }
        else{
          navigate('/')
        }
      }
      catch(error){
        navigate('/')
      }
    }

    const onClickYes=()=>{

      sendReqforMatch()
      handleClose()

    }


    const [activateYes,setActivateYes]=useState(false)


    const getMenteeMentorData=async()=>{

        const token=localStorage.getItem('token')
        const axiosConfig={
          headers:{
            Authorization:`Bearer ${token}`,
          },
        };
        const obj={
            'menteeEmail':menteeEmailId,
            'mentorEmail':mentorEmailId
        }
        try {
          const response = await axios.post(endpoint+'/getmentormenteedetails',obj,axiosConfig);
          if (response.status === 200) {

            setMentee(response.data.mentee)
            setMentor(response.data.mentor)


            if( (response.data.mentee) && (response.data.mentor)){
              setActivateYes(true)
            }else{
              setActivateYes(false)
            } 
            
            
            callToast(response.data.message,response.data.type)
    
            setLoading(false)
            
    
          }else{
            navigate('/')
          }
      }
      
      catch(error){
       
        navigate('/')
      }
        
      }

      const navigate=useNavigate()

      const callToast=(m,t)=>{
        if(t=='success'){
          toast.success(m, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              });
      }else if(t=='info'){
          toast.info(m, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              });
      }else if(t=='error'){
          toast.error(m, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              });
      }else if(t=='warning'){
          toast.warn(m, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              });
      }else{
          toast(m, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              });
        }
      }
    const onClickMatch=()=>{
        setLoading(true)
        getMenteeMentorData()
        handleOpen()
        
    }

    const [loading,setLoading]=useState(false)



  return (
    <>
    <TopAppBar/>

    <ToastContainer/>

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
          {loading?<LoadingComponent loading={loading}/>:<>

          
           {mentee? <Card elevation={5} sx={{width:'440px'}}><DisplayCard c={'white'} data={mentee}/></Card>:<>
           <Typography>Mentee Not found</Typography></>}
            {mentor ? <Card sx={{width:'440px'}} elevation={5}><DisplayCard c={'white'}  data={mentor}/></Card>:<>
            <Typography>Mentor Not found</Typography></> }
            </>}
          </Stack>

          <Button onClick={onClickYes} variant='contained' disabled={!activateYes} sx={{marginTop:'1rem',float:'right'}}>Yes</Button>
        </Box>
      </Modal>
    <Stack sx={{flex:1,flexDirection:'row',justifyContent:'center'}}>
    <Table sx={{ maxWidth: 650 }} aria-label="simple table">
    <TableHead >
                    <TableRow>
                        
                        <TableCell align="center">Mentee Email Id</TableCell>
                    </TableRow>
                   
    </TableHead>
    <TableBody>

    <TableRow>
    <TableCell component="th" scope="row" align="center"> 
    <TextField value={menteeEmailId} onChange={(e)=>setMenteeEmailId(e.target.value)} sx={{width:'300px'}} id="standard-basic" label="Mentee email id" variant="standard" />
    </TableCell>
    
    </TableRow>

    </TableBody>
    </Table>
    <Table sx={{ maxWidth: 250 }} aria-label="simple table">
    <TableHead >
                    <TableRow>
                        
                        <TableCell align="center">Action</TableCell>
                    </TableRow>
                   
    </TableHead>
    <TableBody>

    <TableRow>
    <TableCell component="th" scope="row" align="center"> 
    <Button onClick={onClickMatch} variant='contained'>
        Match
    </Button>
    </TableCell>
    
    </TableRow>

    </TableBody>


    </Table>
    <Table sx={{ maxWidth: 650 }} aria-label="simple table">
    <TableHead >
                    <TableRow>
                        
                        <TableCell align="center">Mentor Email Id</TableCell>
                    </TableRow>
                   
    </TableHead>
    <TableBody>

    <TableRow>
    <TableCell component="th" scope="row" align="center"> 
    <TextField sx={{width:'300px'}} value={mentorEmailId} onChange={(e)=>setMentorEmailId(e.target.value)} id="standard-basic" label="Mentor email id" variant="standard" />
    </TableCell>
    
    </TableRow>

    </TableBody>


    </Table>
    </Stack>

    
    </>
  )
}

export default ManualMatch