import React, { useEffect, useState } from 'react'
import TopAppBar from './TopAppBar'
import { Box, Button, Card, CardActions, CardContent, Container, FormControl, InputLabel, MenuItem, Modal, Select, Stack, TextField, Typography } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import { format } from 'date-fns';
import endpoint from '../API/api';
import axios from 'axios';
import MailCard from './MailCard';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    bgcolor: 'background.paper',
    borderRadius:'2px',
    boxShadow: 24,
    p: 2,
  };
const MailSystem = () => {
    const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [user, setUser] = React.useState('');
  const [subject,setSubject]=useState('')
  const [body,setBody]=useState('')
  const [date,setDate]=useState()
  const [mails,setMails]=useState([
    
  ])

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
  const handleChange = (event) => {
    setUser(event.target.value);
  };

  const handleClick=()=>{

    // const today = new Date();
    

    // const newMail={
    //   id:3,
    //   user,
    //   subject,
    //   body,
    //   date,
    //   'completed':false,
    //   'created_on':today,
    //   'creates_by':'test user1',
    //   'completed_on':null,
    //   'completed_by':''
    // }

    // setMails([...mails,newMail])

    addMail()

    handleClose()

  }
  const [todayDate,setTodayDate]=useState(new Date())



  useEffect(()=>{
    const today = new Date();

    setTodayDate(today)
   getMailsDetails()
  },[])
  const navigate=useNavigate()
  const [mailObjectToSend,setMailObjToSend]=useState()
  const sendMailReq=(mail)=>{
    setMailObjToSend(mail)
    setTypeOfModel('send')
    handleOpen()
  }
  const handleOpenSend=()=>{
    
  }
  const handleConfirmSendMail=()=>{
      handleClose()
      sendMail()
  }
  const sendMail=async()=>{
    setLoading(true)
    const token=localStorage.getItem('token')
    const axiosConfig={
      headers:{
        Authorization:`Bearer ${token}`,
      },
    };

    const mailobj=mailObjectToSend

    const td=new Date()

    const obj={
      'mail':mailobj,
      'todayDate':td
    }

    try{

      const response = await axios.post(endpoint+'/sendMail',obj,axiosConfig);
        if (response.status === 200) {

          setMails(response.data.mails)
          setLoading(false)
          callToast(response.data.message,response.data.type)
          
  
        }else{
          navigate('/')
        }

    }catch(error){
      navigate('/')
    }

  }

  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  const handleEditClick=()=>{
    editMail()
    handleClose()
  }
  const [editId,setEditId]=useState()
  const editMail=async()=>{
    setLoading(true)
    const token=localStorage.getItem('token')
    const axiosConfig={
      headers:{
        Authorization:`Bearer ${token}`,
      },
    };

    const mail={
      'id':editId,
      user,
      subject,
      body,
      date,


    }

    const obj={
      'mail':mail
    }

    try{

      const response = await axios.post(endpoint+'/editMail',obj,axiosConfig);
        if (response.status === 200) {

          setMails(response.data.mails)
          setLoading(false)
          callToast(response.data.message,response.data.type)
        }else{
          navigate('/')
        }

    }catch(error){
      navigate('/')
    }
  }

  const addMail=async()=>{
    setLoading(true)
    const token=localStorage.getItem('token')
    const axiosConfig={
      headers:{
        Authorization:`Bearer ${token}`,
      },
    };

    const min = 1;
    const max = 1000000;
    let randomNumber = getRandomNumber(min, max);
    

    while(true){
      const isIdPresent = mails.some(item => item.id === randomNumber);
      if (isIdPresent) {
        randomNumber = getRandomNumber(min, max);
      } else {
        break
      }
    }
    const today=new Date()
    const mail={
      'id':randomNumber,
      user,
      subject,
      body,
      date,
      'completed':false,
      'created_on':today,
      'created_by':'',
      'completed_on':null,
      'completed_by':''

    }

    const obj={
      'mail':mail
    }

    try{

      const response = await axios.post(endpoint+'/addMail',obj,axiosConfig);
        if (response.status === 200) {

          setMails(response.data.mails)
          setLoading(false)
          callToast(response.data.message,response.data.type)
        }else{
          navigate('/')
        }

    }catch(error){
      navigate('/')
    }

  }


  const getMailsDetails=async()=>{
    setLoading(true)

    const token=localStorage.getItem('token')
    const axiosConfig={
      headers:{
        Authorization:`Bearer ${token}`,
      },
    };


      try {
        const response = await axios.get(endpoint+'/getMails',axiosConfig);
        if (response.status === 200) {

          setMails(response.data.mails)
          setLoading(false)
          response.data.mails.map((mail)=>{

            const taday=new Date()


          })
  
        }else{
          navigate('/')
        }
    }
    catch(error){
      navigate('/')
    }
    setLoading(false)
  }

  const handleDate=(newDate)=>{

    setDate(newDate)
  }

  const [typeOfAction,setTypeOfAction]=useState('Add')

  const onClickEdit=(mailval)=>{
    setEditId(mailval.id)

    setUser(mailval.user)
      setSubject(mailval.subject)
      setBody(mailval.body)
      const dateObj = dayjs(mailval.date)
  
    setDate(dateObj)
    setTypeOfAction('Edit')

      setTypeOfModel('mail')
      handleOpen()
   



  }

  const handleAddClick=()=>{
    setTypeOfAction('Add')
    setUser()
      setSubject()
      setBody()
      const dateObj = dayjs()
      setDate()
      setTypeOfModel('mail')
    handleOpen()
  }

  
  

  const [loading,setLoading]=useState(true)
  const [typeOfModel,setTypeOfModel]=useState('mail')

  return (
    <>
    <TopAppBar/>

    <ToastContainer/>

    {loading ?<Typography>Loading</Typography>: <>

    <Stack sx={{flexDirection:'row',justifyContent:'center',paddingTop:'1rem',paddingBottom:'1rem',backgroundColor:'#f7f7f7'}}>
    <Container maxWidth='md'>
      <Stack sx={{flexDirection:'row',justifyContent:'space-between'}}>
      <Typography variant='h6' sx={{fontWeight:'bold'}}>Mail System</Typography>
   
  <Button sx={{justifyContent:'right'}} variant='contained' color='info' onClick={handleAddClick}>Add New Mail</Button>

      </Stack>
    

    </Container>
  </Stack>
    
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box  sx={style}>
          {typeOfModel=='send' &&<>
          <Box sx={{p:1}}>
          <Typography>Are you sure you want to send</Typography>

<Stack justifyContent={'right'} flexDirection={'row'}>
  <Box>
  <Button variant='contained' color='success' onClick={handleConfirmSendMail}>Yes</Button>
  </Box>
</Stack>
          </Box>
          </>}
       {typeOfModel=='mail' && <>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{textAlign:'center'}}>
            Mail Details
          </Typography>
          
          <FormControl fullWidth sx={{my:1}}>
        <InputLabel id="demo-simple-select-label">User</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={user}
          label="User"
          onChange={handleChange}
        >
          <MenuItem value={'All Mentees'}>All Mentees</MenuItem>
          <MenuItem value={'All Mentors'}>All Mentors</MenuItem>
          <MenuItem value={'Matched Mentees'}>Matched Mentees</MenuItem>
          <MenuItem value={'Matched Mentors'}>Matched Mentors</MenuItem>
          <MenuItem value={'Unmatched Mentees'}>Unmatched Mentees</MenuItem>
          <MenuItem value={'Unmatched Mentors'}>Unmatched Mentors</MenuItem>
          <MenuItem value={'Remind Mentees: Month 1'}>Remind Mentees: Month 1</MenuItem>
          <MenuItem value={'Remind Mentees: Month 2'}>Remind Mentees: Month 2</MenuItem>
          <MenuItem value={'Remind Mentees: Month 3'}>Remind Mentees: Month 3</MenuItem>
          <MenuItem value={'Remind Mentees: Month 4'}>Remind Mentees: Month 4</MenuItem>
          

        </Select>
      </FormControl>
      <TextField fullWidth id="outlined-basic" label="Subject" value={subject} onChange={(e)=>setSubject(e.target.value)} variant="outlined" sx={{my:1}}/>
      <TextField
  placeholder="Body"
  value={body}
  onChange={(e)=>setBody(e.target.value)}
  multiline
  rows={10}
  fullWidth
  sx={{my:1}}
/>
<LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker label="Date" value={date} onChange={(newValue) => handleDate(newValue)}/>
      </DemoContainer>
    </LocalizationProvider>

    <Stack sx={{flexDirection:'row',justifyContent:'space-between',my:1}}>
        <Button onClick={handleClose}>Cancel</Button>
        {typeOfAction=='Add' && <Button variant='contained' onClick={handleClick} color='success'>Add</Button>}
        {typeOfAction=='Edit' && <Button variant='contained' onClick={handleEditClick} color='success'>Save </Button>}
    </Stack>
          </>}   

        </Box>
      </Modal>


    <Container maxWidth='md' sx={{my:2}}>
        <Stack spacing={2}>

          {mails.length==0 && <Typography>No Mails Found</Typography>}

        {
            mails.map((mail)=>{
                return(
                    <MailCard sendMail={sendMailReq} onClickEdit={onClickEdit} mail={mail}/>
                )
            })
        }
        </Stack>
        

    </Container></>}
    </>
  )
}

export default MailSystem