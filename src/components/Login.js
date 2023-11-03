import { Alert, Box, Container, Stack, Typography,CircularProgress } from '@mui/material'
import React,{useState} from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowRight} from '@fortawesome/free-solid-svg-icons'
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from "@mui/material/Button";
import axios from 'axios'
import endpoint from '../API/api';

import { Link, useNavigate } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux'
import { useEffect } from 'react';

const Login = ({setAuth}) => {
 
    const navigate=useNavigate()
    const dispatch=useDispatch()

    const [gmail, setGmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleLogin=async(e)=>{
      e.preventDefault()
      setLoading(true)
        const obj={
            'email':gmail,
            'password':password
        }
        try {
        const response = await axios.post(endpoint+ '/adminsignin', obj);
      
            if (response.status === 200) {
              const user=response.data
              console.log('user data ',user)
              if(user==null || Object.keys(user).length === 0){
                setLoading(false)
                setErrorMessage('Something went wrong')
                handleShowAlert(true)
                return
              }
              else{
                setAuth(true)
                
                localStorage.setItem('auth', 'true');
                navigate('/');
                
                console.log('response from login ',response.data)
                return
              }
              
      
            } else {
              setLoading(false)
              console.error('Failed to submit user data.');
              setErrorMessage('Something went wrong')
                handleShowAlert(true)
                return
              }
            } catch (error) {
              setLoading(false)
            console.error('Error:', error);
            setErrorMessage('Something went wrong')
                handleShowAlert(true)
                return
            }
        
      
        
      }

    const handleChange = (event) => {
      
      const {name,value}=event.target
      if(name=='gmail'){
        setGmail(value)
      }
      else{
        setPassword(value)
      }


    };

    const handleClick=async()=>{
        try{
            const p={
                gmail:gmail,
                passwod:password
            }
            const res= await axios.post(endpoint+'auth',p);
              if(res.status === 200){
                console.log(res)
                const s=res.data
                
                if(s.status){
                    
                    navigate('/home')
                }else{
                  setLoading(true)
                    Alert('Error')
                }
              }
              else {
                console.error('Failed to submit user data.');
                setLoading(true)
              }
            } catch (error) {
              console.error('Error:', error);
              setLoading(true)
            }    
    }
    const [showAlert,setShowAlert]=React.useState(false)
    const handleShowAlert=(val)=>{
      // const val=!showAlert
      setShowAlert(val)
    }
  
    const [errorMessage,setErrorMessage]=React.useState("Error message")

    const [loading,setLoading]=useState(false)

    useEffect(()=>{
      setLoading(false)
    },[])


  return (
    <>
    {loading?<Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"  // Set the desired height for the container
    >
      <CircularProgress />
    </Box>:
    <Container sx={{height:'90vh'}} component="main" maxWidth="xs">
    <Stack sx={{flex:1,flexDirection:'row',justifyContent:'center'}}>
     {showAlert && <Alert onClose={()=>{handleShowAlert(false)}} sx={{position:'absolute',top:'2%'}} severity="error">{errorMessage}</Alert>}
     </Stack>

     
   
     <Stack sx={{height:'100%',justifyContent:'center',textAlign:'center'}}>
     <Typography sx={{fontWeight:'bold'}}>Login to admin dashboard </Typography>
     <Typography sx={{fontWeight:'bold'}}>please login on laptop only, don't login on mobile</Typography>

        
         <Box sx={{boxShadow: 3,
                 borderRadius: 2,
                 px: 4,
                 py: 3,
                 }} >
                     <Box display="flex"
                         justifyContent="center"
                         alignItems="center" sx={{paddingBottom:'20px'}}>
                         <Link to="/"><img  alt="Logo" src="techpact-logo.png" style={{
                         width: '50%', // Adjust the width as needed
                         height: '50%', // Adjust the height as needed
         }}/></Link>
                     </Box>
             <form onSubmit={handleLogin}>
             <Stack direction='column' >
             <FormControl variant="outlined">
                     <InputLabel >Email</InputLabel>
                     <OutlinedInput
                     name='gmail'
                     value={gmail}
                     onChange={handleChange}
                        
                         type={'text'}
                         
                         label="Gmail"
                         required
                     />
                     </FormControl>
                 <Box sx={{flex:1,width:'100%',paddingTop:'1rem'}}>
             
                 <FormControl variant="outlined" style={{width:'100%'}} >
                     <InputLabel >Password</InputLabel>
                     <OutlinedInput
                     name='password'
                     value={password}
                     onChange={handleChange}
                        
                         type={showPassword ? 'text' : 'password'}
                         endAdornment={
                         <InputAdornment position="end">
                             <IconButton
                             aria-label="toggle password visibility"
                             onClick={handleClickShowPassword}
                             onMouseDown={handleMouseDownPassword}
                             edge="end"
                             >
                             {showPassword ?  <Visibility />:<VisibilityOff />}
                             </IconButton>
                         </InputAdornment>
                         }
                         label="Passcode"
                         required
                     />
                     </FormControl>
                     </Box>
                     
                     <Button
                         // onClick={handleLogin}
                         type='submit'
                         fullWidth
                         variant="contained"
                         sx={{ mt: 3, mb: 2, '&:hover': {
                            
                             
                         },}}
                         
                     >
                         Login <FontAwesomeIcon style={{paddingLeft:'1rem'}} icon={faArrowRight} />
                     </Button>
                    
             </Stack>
             </form>
                 

         </Box>
     </Stack>
 </Container>}
    </>
  )
}

export default Login