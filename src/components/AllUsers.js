import React, { useEffect, useState } from 'react'
import TopAppBar from './TopAppBar'
import axios from 'axios'
import endpoint from '../API/api'
import { useNavigate } from 'react-router-dom'
import { Container, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import UserCard from './UserCard'
const AllUsers = () => {

  const navigate=useNavigate()

  const [allusers,setAllusers]=useState([])
  const [loading,setLoading]=useState(true)
  useEffect(()=>{
    getallusers()
  },[])

  const getallusers=async()=>{
    try {
      
      const token=localStorage.getItem('token')

      const axiosConfig={
        headers:{
          Authorization:`Bearer ${token}`,
        },
      };
      const response = await axios.get(endpoint+'/allusers',axiosConfig);
      if (response.status === 200) {
        setAllusers(response.data.allusers)
        setLoading(false)

      }else{
        navigate('/')
      }
  }
  catch(error){
    navigate('/')
  }
  }
  const [filterType, setFilterType] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Function to filter users based on search query
  const filteredUsers = allusers.filter(user =>{
    const nameMatch = user.firstname.toLowerCase().includes(searchQuery.toLowerCase());
    if (filterType=='All'){
      return nameMatch;
    }
    else if(filterType=='Mentees'){
      const typeMatch = user.mentee == 'true' ?true: false;
      return nameMatch && typeMatch;
    }
    else if(filterType=='Mentors'){
      const typeMatch = user.mentor == 'true' ?true: false;
      return nameMatch && typeMatch;
    }
    return nameMatch
    

});

  // Event handler to update search query state
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
  };
  return (
    <>
    <TopAppBar/>
    {loading? <Typography>Loading</Typography>:<>
    <Container sx={{pt:2}}>
    {/* <input
        type="text"
        placeholder="Search users by first name"
        value={searchQuery}
        onChange={handleSearchChange}
      /> */}
      <TextField id="standard-basic" label="Search" variant="standard"
        type="text"
        placeholder="Search users by first name"
        value={searchQuery}
        onChange={handleSearchChange}
        sx={{mr:2}}
      />
      {/* <select value={filterType} onChange={handleFilterChange}>
        <option value="">All</option>
        <option value="mentor">Mentor</option>
       
      </select> */}
      <FormControl sx={{width:'150px'}}>
        <InputLabel id="demo-simple-select-label">Filter</InputLabel>
      <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={filterType} onChange={handleFilterChange}
          label="Filter"
          name='Filter'
   
        >
          <MenuItem value={'All'}>All</MenuItem>
          <MenuItem value={'Mentors'}>Mentors</MenuItem>
          <MenuItem value={'Mentees'}>Mentees</MenuItem>
        </Select>
        </FormControl>
    </Container>
    <Stack  sx={{pt:2, flexDirection:'row', display:'flex', flexWrap:'wrap',justifyContent: 'center', alignItems: 'center'}}>
    {filteredUsers.map((user)=>{
      return <UserCard user={user}/>

      
    })}
      </Stack>
    </>}
  


    </>
  )
}

export default AllUsers