
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Stack,Box, Typography } from '@mui/material';

import DisplayCard from '../DisplayCard';
import axios from 'axios';
import endpoint from '../../API/api';
import CircularProgress from '@mui/material/CircularProgress';
import LoadingComponent from '../LoadingComponent';
import DisplayUserCardForHistory from '../DisplayUserCardForHistory';
import TopAppBar from '../TopAppBar';
import { useNavigate } from 'react-router-dom';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('','', 49, 3.9),
];

export default function RecentHistory() {

    const [rows,setRows]=React.useState([
        {
            id:1,
        },{
            id:2
        }
    ])

    const [mentors,setMentors]=React.useState([])
    const [mentees,setMentees]=React.useState([])

    const [loading,setLoading]=React.useState(true)
    const navigate=useNavigate()
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
     
    }

    React.useEffect(()=>{
      getData()




    },[])
    const handleClick=()=>{

    }
  return (
    <>
    <TopAppBar/>
    <Stack sx={{flexDirection:'row',justifyContent:'center',paddingTop:'1rem',paddingBottom:'1rem',backgroundColor:'#f7f7f7'}}>
    <Typography variant='h6' sx={{fontWeight:'bold'}}>Completed matches</Typography>
  </Stack>
    <Stack sx={{flexDirection:'row',display:'flex'}}>
      {loading?<LoadingComponent loading={loading}/>:
      <>
      

      <Table sx={{ }} aria-label="simple table">
        
        <TableHead>
          <TableRow>
            
            <TableCell align="center">Mentees</TableCell>
            
            
            
          </TableRow>
        </TableHead>
        <TableBody sx={{float:'right'}}>
        
          {mentees.map((row,index) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 ,justifyContent:'left',flex:'1'} }}
            >
              <TableCell component="th" scope="row" align="left" > 
              <Stack sx={{flexDirection:'row'}}>
                <Typography sx={{mr:3}}>{index+1}</Typography>
              <DisplayUserCardForHistory c={'white'} index={index} data={row}/>
              </Stack>
              </TableCell>
              
             
             
            </TableRow>
          ))}
          

          
          
        </TableBody>
      </Table>
   
      <Table sx={{ }} aria-label="simple table">
        <TableHead>
          <TableRow>
            
            <TableCell align="center">Mentors</TableCell>
            
            
            
          </TableRow>
        </TableHead>
        <TableBody >
        
          {mentors.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 ,justifyContent:'left',flex:'1'} }}
            >
              <TableCell component="th" scope="row" align="left"> 
              <DisplayUserCardForHistory c={'white'} data={row}/>
              </TableCell>
              
             
             
            </TableRow>
          ))}
          

          
          
        </TableBody>
      </Table>
      
      
       
        
        
        
      </>}

        
      
    </Stack></>
  );
}