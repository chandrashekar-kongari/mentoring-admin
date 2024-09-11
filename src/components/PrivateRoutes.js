import axios from 'axios'
import { Navigate, Outlet } from 'react-router-dom'
import endpoint from '../API/api'
import { useEffect, useState } from 'react'
import LoadingComponent from './LoadingComponent'

export const PrivateRoutes = () => {

    const [auth,setAuth]=useState(false)
    
    const autheticated=async()=>{
  
      try {
        const token=localStorage.getItem('token')
          const axiosConfig = {
            headers: {
              Authorization: `Bearer ${token}`,
            
            },
          };
        const response = await axios.get(`${endpoint}/isautheticated`,axiosConfig);
      
            if (response.status === 200) {
              setAuth(true)
            }
            else{
              setAuth(false)
            }
          }
            catch(error){
              setAuth(false)
            }
            setLoading(false)
    }
    
    useEffect(()=>{
      setLoading(true)
      autheticated()
    },[auth])  

    const [loading,setLoading]=useState(true)

return (
    <>
    {loading?<LoadingComponent loading={loading}/>:(auth ? <Outlet/> : <Navigate to='/'/>)}
    </>
  )
}