import { Button, FormControl, FormControlLabel, FormLabel, Menu, MenuItem, NativeSelect, Radio, RadioGroup,  Typography} from '@mui/material'
import { Box, Stack } from '@mui/system'
import React from 'react'
import arrowIcon from '../assets/ArrowPurpleLogo.svg';




const FiltersHome = ({handleSort}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [value, setValue] = React.useState('female');

  const handleChange = (event) => {
    setValue(event.target.value);
    handleSort(value);
  };

  return (

  <Stack gap={4} sx={{fontFamily:'Afacad'}} width={'18%'}>
    <Stack>
      <Typography variant="body1" color="initial" fontWeight={'500'}>Sort by:</Typography>
      <FormControl sx={{ m: 1 }} variant="standard">
              <NativeSelect
                disableUnderline
                id="demo-customized-select-native"
                value={value}
                onChange={handleChange}
                sx={{
                  '& .MuiNativeSelect-icon': {
                    color:'#4A1B96'
                  },
                  borderRadius:'5px',
                  border: '0.5px solid #ECE6E6',
                  background: '#FFF',
                  boxShadow: '1px 1px 4px 0px rgba(0, 0, 0, 0.10)',
                  pl:1
                }}
              >
                <option value={'%2BscheduleDate'}>Schedule Date</option>
                <option value={'%2BflightDirection'}>Flight Direction</option>
              </NativeSelect>
      </FormControl>
    </Stack>


    <Box>
      <Typography variant="body1" color="initial" fontWeight={500}>
          Arrival Time
      </Typography>

      <FormControl>

        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel value="5:00 AM - 11:59 AM" control={
            <Radio
            size='small'
            sx={{
              color: '#4A1B96',
              '&.Mui-checked': {
                color: '#4A1B96',
              },
            }}
            /> } label="5:00 AM - 11:59 AM" />

          <FormControlLabel sx={{fontWeight:'700 !important'}} value="12:00 PM - 5:59 PM" control={
            <Radio
            size='small'
            sx={{
              color: '#4A1B96',

              '&.Mui-checked': {
                color: '#4A1B96',
              },
            }}
            /> } label="12:00 PM - 5:59 PM" />
        </RadioGroup>
      </FormControl>
    </Box>

    <Box>
      <Typography variant="body1" color="initial" fontWeight={500}>
          Stops
      </Typography>

      <FormControl>

        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel value="5:00 AM - 11:59 AM" control={
            <Radio
            size='small'
            sx={{
              color: '#4A1B96',
              '&.Mui-checked': {
                color: '#4A1B96',
              },
            }}
            /> } label="5:00 AM - 11:59 AM" />

          <FormControlLabel sx={{fontWeight:'700 !important'}} value="12:00 PM - 5:59 PM" control={
            <Radio
            size='small'
            sx={{
              color: '#4A1B96',

              '&.Mui-checked': {
                color: '#4A1B96',
              },
            }}
            /> } label="12:00 PM - 5:59 PM" />
        </RadioGroup>
      </FormControl>
    </Box>

    <Box>
      <Typography variant="body1" color="initial" fontWeight={500}>
          Airlines Included
      </Typography>

      <FormControl>

        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel value="5:00 AM - 11:59 AM" control={
            <Radio
            size='small'
            sx={{
              color: '#4A1B96',
              '&.Mui-checked': {
                color: '#4A1B96',
              },
            }}
            /> } label="5:00 AM - 11:59 AM" />

          <FormControlLabel sx={{fontWeight:'700 !important'}} value="12:00 PM - 5:59 PM" control={
            <Radio
            size='small'
            sx={{
              color: '#4A1B96',

              '&.Mui-checked': {
                color: '#4A1B96',
              },
            }}
            /> } label="12:00 PM - 5:59 PM" />
        </RadioGroup>
      </FormControl>
    </Box>
  </Stack>

  )
}

export default FiltersHome