import { Button, Divider, Typography } from '@mui/material'
import { Box, Stack } from '@mui/system'
import React, { useEffect, useState } from 'react'

import dividerIcon from '../assets/Line.svg';
import departureMiniIcon from '../assets/DescendingBlackLogo.svg';
import arrivalMiniIcon from '../assets/AscendingBlackLogo.svg';
import planeMiniIcon from '../assets/PlanePurpleLogo.svg';
import axios from 'axios';





const FlightToBook = ({flight, destinations, startDate, endDate}) => {

  const startDateToFormat = JSON.stringify(startDate).substring(0, 11);
  //console.log(startDateToFormat);

  const endDateToFormat = JSON.stringify(endDate).substring(0, 11);
  //console.log(startDateToFormat);

  const [location, setLocation] = useState([]);
  const [arrivalTime, setArrivalTime] = useState("Bilinmiyor");
  const [airline, setAirline] = useState("");


  useEffect(() => {
    const fetchAllDestinations = async () => {
      try {
        const responses = await Promise.all(
          destinations.map(dest => axios.get(`http://localhost:8080/destinations/${dest}`))
        );
        const data = responses.map(response => response.data);
        //console.log(data);
        setLocation(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchAllDestinations();

    if (flight.estimatedLandingTime) {
      const time = flight.estimatedLandingTime.substring(11, 16);
      setArrivalTime(time);
    }
  }, [destinations, flight.estimatedLandingTime]);
  console.log(typeof(flight.scheduleDate));
  const handleSave = async () => {
    try {
      await axios.post('http://localhost:8080/savedata', {
        date: flight.scheduleDate,
        code: flight.flightName,
        number: flight.flightNumber,
        destination: flight.route.destinations[0],
      });
      alert('Flight data saved successfully!');
    } catch (error) {
      console.error('Error saving flight data:', error);
      alert('Failed to save flight data.');
    }
  };

  useEffect(() => {
    const fetchAirlineData = async () => {
      let airlineCode = flight.prefixIATA;
      console.log(airlineCode);
      try {
        const response = await axios.get(`http://localhost:8080/airline/${airlineCode}`, {
          withCredentials: true, // CORS ile birlikte çalışması için gerekli
        });
        setAirline(response.data);
        console.log(airline);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchAirlineData();
  }, []);


  // console.log(flight);
  //console.log(location);
  return (
    <Stack sx={{}} >
      <Stack  gap={2} sx={{borderRadius: '15px', background: '#FFF', pt:1, boxShadow:'0px 5px 5.8px 0px   rgba(0, 0, 0, 0.20)'}}>

        <Stack direction={'row'} gap={10} alignItems={'center'} justifyContent={'center'} mr={3} pl={3} mt={1}>
          <Box textAlign={'center'}>
            <Stack direction={'row'} alignItems={'center'} gap={1}>
              <div className='IconContainer'> <img alt='Departure' src={departureMiniIcon}></img> </div>
              <Typography variant='body2' color='rgba(0, 0, 0, 0.70)' fontSize={'14px'} sx={{fontWeight:'400'}}>Departure</Typography>
            </Stack>
            <Typography sx={{fontWeight:'600'}}>{flight.scheduleTime.substring(0,5)}</Typography>
          </Box>
          <div className='IconContainer'><img alt='Line' src={dividerIcon}></img></div>
          <Stack gap={1} alignItems={'center'} justifyContent={'center'}>
            <Typography  variant="body1" color="initial" sx={{fontWeight:'600', textWrap:'nowrap'}}>
              {location.join('-')}
            </Typography>
            <div className='IconContainer'><img alt='plane' src={planeMiniIcon}></img></div>
            <Typography variant="body1" color="initial" sx={{fontWeight:'600', textWrap:'nowrap'}}>{airline}</Typography>
          </Stack>
          <div className='IconContainer'><img alt='Line' src={dividerIcon}></img></div>
          <Box textAlign={'center'}>
            <Stack direction={'row'} alignItems={'center'} gap={1}>
            <div className='IconContainer'> <img alt='Departure' src={arrivalMiniIcon}></img> </div>
            <Typography variant='body2' color='rgba(0, 0, 0, 0.70)' fontSize={'14px'} sx={{fontWeight:'400'}}>Arrival</Typography>
            </Stack>
            <Typography sx={{fontWeight:'600'}}>{arrivalTime}</Typography>
          </Box>
        </Stack>

        <Stack  direction={'row'} justifyContent={'space-between'}>
          <Button  sx={{borderRadius: '0px 10px ', background: '#DCD6E5', width:'fit-content', alignItems:'center', justifyContent:'center', width:'170px'}} >
            <Typography   color="#4A1B96" sx={{m:0.5, fontWeight:'600 !important', fontSize:'16px', textDecorationLine: 'underline', textTransform: 'none'}}>Check the details</Typography>
          </Button>
          <Button onClick={handleSave} sx={{borderRadius: '10px 0px', background: '#4A1B96', alignItems:'center', justifyContent:'center', width:'170px'}} >
            <Typography color="#FFF" sx={{textTransform: 'none', fontWeight:'700 !important', fontSize:'18px', textAlign:'center'}}>Book Flight</Typography>
          </Button>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default FlightToBook