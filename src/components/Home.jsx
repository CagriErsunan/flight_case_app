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

  const [flights, setFlights] = useState([]);

  const [dates, setDates] = useState({ startDate: null, endDate: null });



  const flightData = {
    estimatedLandingTime:'',
    scheduleDate:'',
    prefixIATA:'',
    flightName: "",
    flightNumber: ""
  }



  const today = new Date().toISOString();
  const DefDate = today.substring(0, 10);

  const [strt, setStrt] = useState(DefDate);
  const [end, setEnd] = useState(DefDate);
  const [sort, setSort] = useState('%2BscheduleDate');
  const [yon, setYon] = useState('IST');


  const handleFlightsFetched = (data) => {
    setFlights(data);
    console.log(flights);
  };

  useEffect(() => {
    const fetchFlightData = async () => {

      try {
        const response = await axios.get(`http://localhost:8080/flights/sort=${sort}&start=${strt}&end=${end}&to=${yon}`, {
          withCredentials: true, // CORS ile birlikte çalışması için gerekli
        });
        const temp = response.data;
        //console.log(temp.flights);
        setFlights(temp.flights);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchFlightData();
  }, []);

  const yonBilgisi = (a) =>{
    setYon(a);
  }

  const handleSort=(a)=>{
    setSort(a);
  }

  const handleDatesChange = (startDate, endDate) => {
    setDates({ startDate, endDate });

    setStrt(startDate);
    setEnd(endDate);
  };
  console.log(yon, strt, end, sort);
  //console.log(flights[0]); //Test amaçlı



  return (
    <ThemeProvider theme={theme}>
    <Stack justifyContent={'center'} alignItems={'center'}  gap={2}>
      <NavBarHome />
      <Stack  direction="row" gap={8} width={'100%'}>
        <Stack alignItems={'flex-start'} justifyContent={'flex-start'}  gap={8} >
          <ShowFlights onFlightsFetched={handleFlightsFetched} FlightDirection={yonBilgisi} onDatesChange={handleDatesChange}  />
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