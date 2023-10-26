import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Stack } from '@mui/material';
import DD from './DD';
import Mentors from './Mentors';

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

export default function MentorsTable({mentors,setMentors}) {
    const handleClick=()=>{

    }
  return (
    <Stack sx={{justifyContent:'center',textAlign:'center',flex:1,flexDirection:'row'}}>
      <Table sx={{ maxWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            
            <TableCell align="center">Mentors</TableCell>
            
            
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="center"> 
                {row.name}
              </TableCell>
              <TableCell align="center">{row.calories}</TableCell>
             
             
            </TableRow>
          ))} */}
          <Mentors mentors={mentors} setMentors={setMentors}/>
          
        </TableBody>
      </Table>
    </Stack>
  );
}