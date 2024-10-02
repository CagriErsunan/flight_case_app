import React from 'react'
import { Stack, Typography,  Button, Select, MenuItem, FormControl, InputLabel, Box} from "@mui/material"
import { styled} from '@mui/system';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { useState, useEffect } from 'react';
import PlaneIcon from "../assets/PlaneBlackLogo.svg";
import {ReactComponent as CalendarIcon} from '../assets/CalendarLogo.svg';

import DepartureIcon from '../assets/AscendingPurpleLogo.svg';
import ArrivingIcon from '../assets/DescendingPurpleLogo.svg';
import axios from 'axios';

const CustomSelect = styled(Select)(({ theme }) => ({
  borderRadius: '51px 0px 0px 51px',
  '& .MuiSelect-select': {
    display: 'flex',
    alignItems: 'center',
  },
}));

const CustomSelector = styled(Select)({
  borderRadius: '0px 50px 50px 0px',
  border: '1px solid #D3D3D3',
  background: '#FFF',
  height:'42px',
  width:'200px',
  gap:5
});

const buttonStyles = {
  borderRadius: '50px 0px 0px 50px',
  backgroundColor: '#4A1B96',
  width: '8rem',
  height: '2.5rem'
};

const buttonStylesAlt = {
  borderRadius: '0px 50px 50px 0px',
  width: '8rem',
  backgroundColor: 'white',
  height: '2.5rem'
};

dayjs.extend(utc);
dayjs.extend(timezone);


const ShowFlights = ({onFlightsFetched}) => {
  const today = new Date();
  const todayDate = today.toISOString();
  //console.log(todayDate);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [direction, setDirection] = React.useState('');

  const [destinations, setDestinations] =  useState([]);

  function ikiBasamaklıGün(gün) {
    return gün.toString().padStart(2, '0');
  }


  const sendSearchParams = () => {
    console.log(`${startDate.$y}-${startDate.$M+1}-${ikiBasamaklıGün(startDate.$D)}`, endDate, direction);
    onFlightsFetched({startDate: `${startDate.$y}-${startDate.$M+1}-${ikiBasamaklıGün(startDate.$D)}`, endDate: `${endDate.$y}-${endDate.$M+1}-${ikiBasamaklıGün(endDate.$D)}`, direction: direction});
  }

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
    <Stack width={'93%'}  gap={3} p={3} pr={4} sx={{background:'#FFF', borderRadius: '25px', boxShadow:'0px 5px 5.8px 0px   rgba(0, 0, 0, 0.20)'}}>
      <Stack direction={'row'} alignItems="center" justifyContent="space-between" >
          <Stack  direction="row" alignItems="center" gap={1.5}>
            <div className="logoContainer">
              <img src={PlaneIcon} alt="Tag Icon" />
            </div>
            <Typography className="MedFont" variant="h5" color="initial">
              BOOK YOUR FLIGHT
            </Typography>
          </Stack>

          <Stack  direction="row">
            <Button sx={buttonStyles} variant="contained">
              <Typography fontWeight={700} variant="body1" color="white">
                Round Trip
              </Typography>
            </Button>

            <Button sx={buttonStylesAlt} variant="contained">
              <Typography fontWeight={700} variant="body1" color="#4A1B96">
                One Way
              </Typography>
            </Button>
          </Stack>
      </Stack>

      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
          <Box sx={{ width:'fit-content'}} >
           <FormControl  fullWidth hiddenLabel>
            <CustomSelector
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={direction}
                onChange={(e) => setDirection(e.target.value)}
                startAdornment={<img src={DepartureIcon} alt="Logo" style={{ marginRight: 8 }} />}
              >
              {destinations.map((destination, index) => (
                <MenuItem key={index} value={destination[0]}>
                  {destination[1]}
                </MenuItem>
              ))}
              </CustomSelector>
            </FormControl>
          </Box>

          <Stack direction='row' gap={1}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={startDate} onChange={(newValue) => setStartDate(newValue)}
                views={['year', 'month', 'day']}
                timezone={'Europe/Istanbul'}
                slotProps={{
                  inputAdornment:{
                    position:'start'
                  },
                  textField: {
                    size: 'small',
                    InputProps: {
                      sx: { borderRadius: '51px 0px 0px 51px', backgroundColor: 'white', height:'42px', border: '1px solid #D3D3D3' }, // Apply the styles here
                    },
                  },
                }}
                label=""
                // Using an SVG component from `@mui/icons-material`
                slots={{ openPickerIcon: CalendarIcon }}
              />
              <DatePicker
                value={endDate} onChange={(newValue) => setEndDate(newValue)}
                views={['year', 'month', 'day']}
                timezone={'Europe/Istanbul'}
                slotProps={{
                  inputAdornment:{
                    position:'start'
                  },
                  textField: {
                    size: 'small',
                    InputProps: {
                      sx: { borderRadius: ' 0px 51px 51px 0px ', backgroundColor: 'white', height:'42px', border: '1px solid #D3D3D3' }, // Apply the styles here
                    },
                  },
                }}
                label=""
                // Using an SVG component from `@mui/icons-material`
                slots={{ openPickerIcon: CalendarIcon }}
              />

            </LocalizationProvider>
          </Stack>
      </Stack>

      <Box width={'120px'}>
        <Button onClick={sendSearchParams} variant="contained" sx={{backgroundColor:'#4A1B96', borderRadius:'5px'}} width={"2px"}>Show Flights</Button>
      </Box>

    </Stack>

  )
}

export default ShowFlights