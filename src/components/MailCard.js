import { Box, Button, Card, CardContent, Chip, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './mailCard.css'
const MailCard = ({mail,onClickEdit,sendMail}) => {

    const [isDisabled,setIsDisabled]=useState(false)

    const [todayDate,setTodayDate]=useState(new Date())

    const [loading,setLoading]=useState(true)

    const [sendDate,setSendDate]=useState()

    const [numberOfDays,setNumberOfDays]=useState()

    const convertDate=()=>{
        const datestring=mail.date
        const dateObject = new Date(datestring);
        setSendDate(dateObject)
        setLoading(false)
        let today = new Date();
        const options = { timeZone: 'America/New_York' };

        // Get the current time in EST
        const currentTimeInEST = today.toLocaleString('en-US', options);
  

        today.setHours(0, 0, 0, 0);
        setTodayDate(today)


        const differenceInMs = today.getTime() - dateObject.getTime();
        const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);
        setNumberOfDays(differenceInDays)


          if(mail.completed ){
            
                setIsDisabled(true)
            
          }
          else if(differenceInDays>0){
            
            setIsDisabled(true)
        
            }else {
            setIsDisabled(false)
          }
  
    }

    const findDay=()=>{

    }

    useEffect(()=>{
      
        convertDate()

    },[])
  return (
    <>
    {loading ?<Typography>Loading</Typography>:
    <Card className={`card ${isDisabled ? 'disabled' : ''}`}>
                        <CardContent>
                            <Typography><span style={{fontWeight:'bold'}}>User: </span>{mail.user}</Typography>
                            <Typography><span style={{fontWeight:'bold'}}>Subject: </span> {mail.subject}</Typography>
                            <Typography><span style={{fontWeight:'bold'}}>Body: </span></Typography>{mail.body}
                            <Typography><span style={{fontWeight:'bold'}}>Send Date: </span>{mail.date.toString()}</Typography>
                            <Stack>
                                <Box>
                                {
                                    // (todayDate.getMonth()==sendDate.getMonth() && todayDate.getFullYear() == sendDate.getFullYear() && todayDate.getDate()>sendDate.getDate())
                                    (!mail.completed && numberOfDays>0 )
                                    && <Chip color='error' label={'Missed'}/>

                                    
                                }
                                {
                                    (mail.completed) && <Chip color='success' label={'Completed'}/>
                                }
                                
                                
                                </Box>
                            </Stack>


                            <Stack sx={{flexDirection:'row',justifyContent:'space-between'}}>

                                {
                                    (numberOfDays<=0 && !mail.completed) && <Button onClick={()=> onClickEdit(mail)} variant='outlined'>Edit</Button>
                                }
                            
                            {/* { (todayDate.getMonth()==sendDate.getMonth() && todayDate.getFullYear() == sendDate.getFullYear() && todayDate.getDate()==sendDate.getDate()) */}
                            { (!mail.completed  && numberOfDays==0)
                              && <Button onClick={()=>sendMail(mail)} variant='contained' color='success'>Send</Button>}
                            </Stack>
                        </CardContent>
            
                            
    

                    </Card>}
    
    </>
  )
}

export default MailCard