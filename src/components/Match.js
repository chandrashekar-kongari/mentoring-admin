import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Stack } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  {
    id:0,
},
{
    id:1,
},
{
    id:2,
},
{
    id:3,
},
{
    id:4,
}
];

export default function Match({onMatch,ids}) {
    const handleClick=(id)=>{
        console.log('id ',id)
        onMatch(id)
        
    }
  return (
    <Stack sx={{justifyContent:'center',textAlign:'center',flex:1,flexDirection:'row'}}>
      <Table sx={{ maxWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Action</TableCell>
           
            
          </TableRow>
        </TableHead>
        <TableBody>
          {ids.map((row,index) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 },height:'100px' }}
            >
              
              
              <TableCell align="center"><Button variant="contained" startIcon={<ArrowLeftIcon/>} endIcon={<ArrowRightIcon />} onClick={()=>handleClick(index)}>Match</Button></TableCell>
             
             
            </TableRow>
          ))}
          
        </TableBody>
      </Table>
    </Stack>
  );
}