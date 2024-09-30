import { Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'

import planeIcon from '../../assets/PlanePurpleLogo.svg';

const Flight = ({flight}) => {
  return (
    <Stack direction={'row'} alignItems={'center'} gap={75} sx={{borderRadius: '10px', background: '#FFF'}} pt={4} pb={4} pl={2} pr={5}>
      <Stack direction={'row'} alignItems={'center'} gap={3} >
        <div className='logoContainer' style={{width:'30px', height:'30px'}}><img style={{width:'100%', height:'100%'}} src={planeIcon} alt='plane' /></div>
        <Stack gap={1} textAlign={'left'}>
          <Typography variant='h5'>{flight.location.toUpperCase()}</Typography>
          <Typography variant='h5'>{flight.scheduleTime.substring(0,5)}</Typography>
        </Stack>
      </Stack>
      <Stack gap={0.5}>
        <Typography variant='h6' color='#4A1B96'>Flight Details</Typography>
        <Typography variant='body1' fontWeight={'700'}>{flight.airline}</Typography>
        <Stack direction={'row'} gap={2}>
          <Typography variant='body1'>{flight.number}</Typography>
          <Typography variant='body1'>{flight.name}</Typography>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Flight