import React from 'react'
import NavBarFlights from './NavBarFlights'
import { Box, ThemeProvider } from '@mui/system'
import { createTheme } from '@mui/material';

const theme = createTheme({
  typography:{
    fontFamily: ['Anuphan']
  }
});

const MyFlights = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box className='flightsPage'>
        <NavBarFlights />

      </Box>
    </ThemeProvider>
  )
}

export default MyFlights