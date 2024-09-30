import React, { useEffect, useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, Menu, MenuItem, TextField, Toolbar, Typography } from '@mui/material'
import { Box, createTheme, Stack, textAlign, ThemeProvider } from '@mui/system'
import AppBar from '@mui/material/AppBar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from 'axios';

const ButtonSX = {
  gap:0.5,
  borderColor:'#8E8E8E',
  textTransform: 'none',
  height:'35px',
  textAlign:'center'
}


const NavBarFlights = () => {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openLoc = Boolean(anchorEl);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [destinations, setDestinations] =  useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLocClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleLocClose = () => {
    setAnchorEl(null);
  };
  const handleClick = () =>{
    console.log("click handled!");
  }

  const handleMenuItemClick = (location) => {
    setSelectedLocation(location);
    handleClose();
  };


  useEffect(() => {
    const fetchDestData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/alldestinations`, {
          withCredentials: true, // CORS ile birlikte çalışması için gerekli
        });
        setDestinations(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchDestData();
  }, []);

  return (
    <AppBar  position='static' color='transparent' elevation={0} sx={{justifyContent:'space-between', alignItems:'center', width:'100%', background: '#FFF'}}>
        <Toolbar  sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Stack direction={'row'} gap={10} justifyContent={'space-between'} alignItems={'center'}>
            <Box display='flex' flexDirection='row'alignItems='center'>
              <Typography variant='h5' color='#4A1B96' fontWeight='medium' textAlign='center' component="div" sx={{ml:0.5}}>
              UÇUŞLARIM
              </Typography>
            </Box>

            <Stack direction={'row'} justifyContent={'center'} alignItems={'center'} gap={1.5}>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Button variant="outlined" onClick={handleClickOpen} sx={ButtonSX}>
                <Typography className='MedFont' variant="body1" color="initial">Time</Typography>
              </Button>
              <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                  <DatePicker
                    label="Select Date"
                    value={selectedDate}
                    onChange={(newValue) => setSelectedDate(newValue)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button onClick={handleClose}>OK</Button>
                </DialogActions>
              </Dialog>
            </LocalizationProvider>
              <Box>
                <Button variant="outlined" onClick={handleLocClick} sx={ButtonSX}>
                  <Typography className='MedFont' variant="body1" color="initial">Location</Typography>
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={openLoc}
                  onClose={handleLocClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  {destinations.map((destination, index) => (
                <MenuItem key={index} value={destination[0]}>
                  {destination[1]}
                </MenuItem>
                ))}
                </Menu>

              </Box>
              <Box>
                <Button variant="outlined" onClick={handleClick} sx={ButtonSX}>
                  <Typography className='MedFont' variant="body1" color="initial">Airlines</Typography>
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={openLoc}
                  onClose={handleLocClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                    {/*destinations.map((destination, index) => (
                  <MenuItem key={index} value={destination[0]}>
                    {destination[1]}
                  </MenuItem>
                  ))*/}
                  <MenuItem>AAAAAAAA</MenuItem>
                </Menu>
              </Box>
              <Box>
                <Button variant="outlined" onClick={handleClick} sx={ButtonSX}>
                  <Typography className='MedFont' variant="body1" color="initial">Airports</Typography>
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={openLoc}
                  onClose={handleLocClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  {/*destinations.map((destination, index) => (
                <MenuItem key={index} value={destination[0]}>
                  {destination[1]}
                </MenuItem>
                ))*/}
                  <MenuItem>AAAAAAAA</MenuItem>
                </Menu>
              </Box>


            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
  )
}

export default NavBarFlights