import { FormControl, NativeSelect, Typography } from '@mui/material'
import { Box, Stack } from '@mui/system'
import React from 'react'

import infoIcon from '../../assets/InfoLogo.svg';


const FilterBarFlights = ({handleSort}) => {
  const [value, setValue] = React.useState('female');

  const handleChange = (event) => {
    setValue(event.target.value);
    handleSort(value);
  };

  return (
    <Stack direction={'row'} alignItems={'center'} gap={1}>
      <div className='logoContainer'><img src={infoIcon} alt='info'/></div>
      <Stack direction={'row'} alignItems={'center'}><Typography variant='body1' color='initial'>Sort by:</Typography>
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
                    color:'#4A1B96',
                    background: '',

                    fontWeight:'700'
                  }}
                >
                  <option value={'%2BscheduleDate'}>Recommended</option>
                  <option value={'%2BflightDirection'}>Flight Direction</option>
                </NativeSelect>
        </FormControl>
      </Stack>
    </Stack>
  )
}

export default FilterBarFlights