import React from 'react'

import { Button, AppBar, ThemeProvider, Toolbar, Typography, Box, IconButton, Avatar, Stack, createTheme} from "@mui/material";

import HomeIcon from '../assets/HomeLogo.svg';
import myAvatar from '../assets/ÇağrıProfilePhoto.jpg';
import tagIcon from '../assets/TagLogo.svg';
import earthIcon from '../assets/EarthLogo.svg';
import MyFlights from './MyFlightsPage/MyFlights';


const username = "Çağrı Ersunan";

const theme = createTheme({
  typography:{
    fontFamily: ['Anuphan'].join(','),
    button: {
    textTransform: 'none'
    }
  }
});

const NavBarHome = () => {



  return (
      <AppBar  position='static' color='transparent' elevation={0} sx={{justifyContent:'space-between', alignItems:'center', width:'100%'}}>
        <Toolbar  sx={{ justifyContent: 'space-between', alignItems: 'center', width:'100%' }}>
          <Box display='flex' flexDirection='row' gap={1} alignItems='center'>
            <div className='logoContainer' id='HomeLogo'><img src={HomeIcon} alt='Main Icon'></img></div>
            <Typography variant='h4' color='inherit' fontWeight='medium' textAlign='center' component="div" sx={{ml:0.5}}>
            PLANET SCAPE
            </Typography>
          </Box>

          <Stack direction={'row'} justifyContent={'center'} alignItems={'center'} gap={1.5}>
            <Stack direction={'row'} justifyContent={'center'} alignItems={'center'} gap={1}>
              <Button sx={{gap:0.5}}>
                <div className='logoContainer'><img src={tagIcon} alt='Tag Icon' ></img></div>
                <Typography className='MedFont' variant="body1" color="initial">Deals</Typography>
              </Button>
            </Stack>
            <Stack>
              <Button sx={{gap:0.5}}>
              <div className='logoContainer'><img src={earthIcon} alt='Tag Icon' ></img></div>
              <Typography className='MedFont' variant="body1" color="initial">Discover</Typography>
              </Button>
            </Stack>
            <Stack direction={'row'} justifyContent={'center'} alignItems={'center'} gap={'5px'}>
              <Avatar alt={username} size  src={myAvatar} sx={{width:'32px', height:'32px'}}/>
              <Typography className='MedFont' variant="body1" color="initial">{username}</Typography>
            </Stack>

          </Stack>

        </Toolbar>
      </AppBar>
  )
}

export default NavBarHome