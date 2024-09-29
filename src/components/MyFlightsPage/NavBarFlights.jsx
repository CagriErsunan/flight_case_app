import React from 'react'
import { Button, Toolbar, Typography } from '@mui/material'
import { Box, createTheme, Stack, textAlign, ThemeProvider } from '@mui/system'
import AppBar from '@mui/material/AppBar';



const NavBarFlights = () => {

  const handleClick = () =>{
    console.log("Click handled!");
  }


const ButtonSX = {
  gap:0.5,
  borderColor:'#8E8E8E',
  textTransform: 'none',
  height:'35px',
  textAlign:'center'
}


  return (
    <AppBar className='flightsPage' position='static' color='transparent' elevation={0} sx={{justifyContent:'space-between', alignItems:'center', width:'100%', background: '#FFF'}}>
        <Toolbar  sx={{ justifyContent: 'space-between', alignItems: 'center', width:'100%' }}>

          <Stack direction={'row'} gap={10}>
            <Box display='flex' flexDirection='row' gap={1} alignItems='center'>
              <Typography variant='h5' color='inherit' fontWeight='medium' textAlign='center' component="div" sx={{ml:0.5}}>
              UÇUŞLARIM
              </Typography>
            </Box>

            <Stack direction={'row'} justifyContent={'center'} alignItems={'center'} gap={1.5}>

              <Button size='small' variant="outlined" onClick={handleClick} sx={ButtonSX}>
                <Typography className='MedFont' variant="body1" color="initial">Time</Typography>
              </Button>
              <Button variant="outlined" onClick={handleClick} sx={ButtonSX}>
                <Typography className='MedFont' variant="body1" color="initial">Stops</Typography>
              </Button>
              <Button variant="outlined" onClick={handleClick} sx={ButtonSX}>
                <Typography className='MedFont' variant="body1" color="initial">Airlines</Typography>
              </Button>
              <Button variant="outlined" onClick={handleClick} sx={ButtonSX}>
                <Typography className='MedFont' variant="body1" color="initial">Airports</Typography>
              </Button>
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
  )
}

export default NavBarFlights