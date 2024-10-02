import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, Typography } from '@mui/material'
import { Box, Stack } from '@mui/system'
import React, { useEffect, useState } from 'react'

import dividerIcon from '../assets/Line.svg';
import departureMiniIcon from '../assets/DescendingBlackLogo.svg';
import arrivalMiniIcon from '../assets/AscendingBlackLogo.svg';
import planeMiniIcon from '../assets/PlanePurpleLogo.svg';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FlightToBook = ({flight, destinations, startDate, endDate}) => {


  const [location, setLocation] = useState([]);
  const [arrivalTime, setArrivalTime] = useState("Bilinmiyor");
  const [airline, setAirline] = useState("");

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [alertForSaving, setalertForSaving] = useState("Hay aksi! Rezervasyonunuz alınamadı. Lütfen tekrar deneyiniz.");


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
  //console.log(typeof(flight.scheduleDate));


  useEffect(() => {
    const fetchAirlineData = async () => {
      let airlineCode = flight.prefixIATA;
      console.log(airlineCode);
      try {
        const response = await axios.get(`http://localhost:8080/airline/${airlineCode}`, {
          withCredentials: true, // CORS ile birlikte çalışması için gerekli
        });
        setAirline(response.data);
        //console.log(airline);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchAirlineData();
  }, [flight.prefixIATA]);



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/saveflights", {name: flight.flightName, number: flight.flightNumber, scheduleTime: flight.scheduleTime, airline: airline, location: location.join('-')});
      console.log(response.data);
      setalertForSaving("Rezervasyonunuz başarıyla yapıldı.");
      handleOpen();
    } catch (error) {
      console.error("Error saving flight data:", error);
    }
  };


  return (
    <Stack sx={{}} >
      <Stack  gap={2} sx={{borderRadius: '15px', background: '#FFF', pt:1, boxShadow:'0px 5px 5.8px 0px   rgba(0, 0, 0, 0.20)'}}>

        <Stack direction={'row'} gap={10} alignItems={'center'} justifyContent={'center'} mr={3} pl={3} mt={1}>
          <Box textAlign={'center'}>
            <Stack direction={'row'} alignItems={'center'} gap={1}>
            <div className='IconContainer'> <img alt='Departure' src={departureMiniIcon}></img> </div>
            <Typography variant='body2' color='rgba(0, 0, 0, 0.70)' fontSize={'14px'} sx={{fontWeight:'400'}}>Arrival</Typography>
            </Stack>
            <Typography sx={{fontWeight:'600'}}>{arrivalTime}</Typography>
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
              <Typography variant='body2' color='rgba(0, 0, 0, 0.70)' fontSize={'14px'} sx={{fontWeight:'400'}}>Departure</Typography>
            </Stack>
            <Typography sx={{fontWeight:'600'}}>{flight.scheduleTime.substring(0,5)}</Typography>
          </Box>
        </Stack>

        <Stack  direction={'row'} justifyContent={'space-between'}>
          <Button  sx={{borderRadius: '0px 10px ', background: '#DCD6E5', width:'fit-content', alignItems:'center', justifyContent:'center', width:'170px'}} >
            <Typography   color="#4A1B96" sx={{m:0.5, fontWeight:'600 !important', fontSize:'16px', textDecorationLine: 'underline', textTransform: 'none'}}>Check the details</Typography>
          </Button>

          <Button onClick={handleSubmit} sx={{borderRadius: '10px 0px', background: '#4A1B96', alignItems:'center', justifyContent:'center', width:'170px'}} >
            <Typography color="#FFF" sx={{textTransform: 'none', fontWeight:'700 !important', fontSize:'18px', textAlign:'center'}}>Book Flight</Typography>
          </Button>
          <Dialog
              borderRadius={'15px'}
              open={open}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClose}
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle>{"PLANET SCAPE"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  {alertForSaving}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button color='#4A1B96' onClick={handleClose}>Tamam</Button>
              </DialogActions>
            </Dialog>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default FlightToBook