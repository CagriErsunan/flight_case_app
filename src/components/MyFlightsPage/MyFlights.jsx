import React, { useEffect, useState } from 'react'
import NavBarFlights from './NavBarFlights'
import { Stack, ThemeProvider } from '@mui/system'
import { createTheme } from '@mui/material';
import FilterBarFlights from './FilterBarFlights';
import Flight from './Flight';
import axios from "axios";

const theme = createTheme({
  typography:{
    fontFamily: ['Anuphan']
  }
});

const MyFlights = () => {
  const [myflights, setmyFlights] = useState([]);

  useEffect(() => {
    const fetchMyFlights = async () =>{
      try {
        const response = await axios.get(`http://localhost:8080/myflights`, {
          withCredentials: true, // CORS ile birlikte çalışması için gerekli
        });
        setmyFlights(response.data);
      } catch (error) {
         console.log('Error fetching your flights: ', error);
      }
    };

    fetchMyFlights();
  }, [])

  console.log(myflights);

  return (
    <ThemeProvider theme={theme}>
      <Stack className='flightsPage' gap={2}>
        <NavBarFlights />
        <FilterBarFlights />
        {myflights.map((flight, index)=>(
          <Flight key={index} flight={flight} />
        ))}

      </Stack>
    </ThemeProvider>
  )
}

export default MyFlights