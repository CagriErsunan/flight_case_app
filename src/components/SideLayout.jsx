import { Button, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import { Box, Stack, styled } from '@mui/system'
import React from 'react'

import carbckgrnd from '../assets/Car.jpeg';
import hotelbckgrnd from '../assets/Hotel.png';
import beachbckgrnd from '../assets/Suitcase.jpeg';


import CarIcon from '../assets/CarLogo.svg';
import HotelIcon from '../assets/HotelLogo.svg';
import BeachIcon from '../assets/BeachLogo.svg';



const SideLayout = () => {


  const ButtonSX = {
    justifyContent:'flex-start',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height:'275px',
    width:'275px',
    borderRadius:'25px',
    overflow:'hidden',

}



  return (
  <Stack justifyContent={'center'} alignItems={'center'} gap={2} width={'20%'}>
    <Button
    variant='contained'
    sx={{...ButtonSX, backgroundImage:`url(${carbckgrnd})` }}>
      <Stack sx={{
        alignSelf:'end',
        }}>
        <Typography variant='h5' className='Cards'>
          <div className='IconContainer'><img alt='carIcon' src={CarIcon}></img></div>
          CAR RENTALS
        </Typography>
      </Stack>
    </Button>

    <Button
    variant='contained'
    sx={{...ButtonSX, backgroundImage:`url(${hotelbckgrnd})`}}>
      <Stack sx={{
        alignSelf:'end',
        }}>
        <Typography variant='h5' className='Cards'>
          <div className='IconContainer'><img alt='carIcon' src={HotelIcon}></img></div>
          HOTELS
        </Typography>
      </Stack>
    </Button>

    <Button
    variant='contained'
    sx={{...ButtonSX, backgroundImage:`url(${beachbckgrnd})`}}>
      <Stack sx={{
        alignSelf:'end',
        }}>
        <Typography variant='h5' className='Cards'>
          <div className='IconContainer'><img alt='carIcon' src={BeachIcon}></img></div>
          TRAVEL PACKAGES
        </Typography>
      </Stack>
    </Button>



  </Stack>
  )


}

export default SideLayout