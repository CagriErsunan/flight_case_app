import React, { useEffect, useState } from 'react'
import NavBarHome from "./NavBarHome";
import ShowFlights from './ShowFlights';
import FiltersHome from './FiltersHome';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Stack, Typography} from "@mui/material"
import SideLayout from './SideLayout';
import FlightToBook from './FlightToBook';

import axios from "axios";
import dayjs from 'dayjs';


const theme = createTheme({
  typography:{
    fontFamily: ['Anuphan'].join(','),

    button: {
    textTransform: 'none'
    }
  }
});

const altFontTheme = createTheme({
  typography: {
    fontFamily: ['Afacad'].join(','),
    fontWeight:'600'
  },
});




const Home = () => {
  const today = new Date().toISOString();
  const DefDate = today.substring(0, 10);
  const [flights, setFlights] = useState([]);

  const [dates, setDates] = useState({ startDate: null, endDate: null });
  const [sort, setSort] = useState('%2BscheduleDate');


  const [searchedFlight, setSearchedFlight] = useState({
    startDate:DefDate,
    endDate:DefDate,
    direction:'IST'
  });

  const handleSearchChange = (data) => {
    setSearchedFlight(data);
    console.log(searchedFlight);
  };

  useEffect(() => {
    const fetchFlightData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/flights/sort=${sort}&start=${searchedFlight.startDate}&end=${searchedFlight.endDate}&to=${searchedFlight.direction}`, {
          withCredentials: true, // CORS ile birlikte çalışması için gerekli
        });
        const temp = response.data;
        setFlights(temp.flights);
        console.log(temp);
      } catch (error) {
        console.error('Error fetching flights:', error);
      }
    };

    fetchFlightData();
  }, [searchedFlight, sort]);

  const handleSort=(a)=>{
    setSort(a);
  }
  //console.log(flights[0]); //Test amaçlı
  return (
    <ThemeProvider theme={theme}>
    <Stack justifyContent={'center'} alignItems={'center'}  gap={2}>
      <NavBarHome />
      <Stack  direction="row" gap={8} width={'100%'}>
        <Stack alignItems={'flex-start'} justifyContent={'flex-start'}  gap={8} >
          <ShowFlights onFlightsFetched={handleSearchChange} />
          <Stack direction={'row'} gap={2}   justifyContent={'space-between'}>
            <ThemeProvider theme={altFontTheme}>
              <FiltersHome handleSort={handleSort} />
            </ThemeProvider>
            <Stack direction={'column'}  gap={10} overflow={'auto'} maxHeight={'550px'} pr={1}>
              <ThemeProvider theme={altFontTheme}>
              {flights.map((flight, index) => (
                <FlightToBook startDate={dates.startDate} endDate={dates.endDate}  key={index} flight={flight} destinations={flight.route.destinations}/>
              ))}
              </ThemeProvider>
            </Stack>

          </Stack>
        </Stack>
        <SideLayout />
      </Stack>
    </Stack>
  </ThemeProvider>
  )
}

export default Home