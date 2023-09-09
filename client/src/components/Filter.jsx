import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function RowRadioButtonsGroup({filteredList}) {

  const handleChangeValues = (value) => {
    let priority = value.target.value
    // console.log("priority is ",priority)
    filteredList(priority)
  };

  return (
    <FormControl>
    {/* <FormLabel id="demo-row-radio-buttons-group-label">Priority</FormLabel> */}
    <RadioGroup
      row
      aria-labelledby="demo-row-radio-buttons-group-label"
      name="row-radio-buttons-group"
    >
      <FormControlLabel value="3" name='priority' control={<Radio />} label="Low" onChange={handleChangeValues} />
      <FormControlLabel value="2" name='priority' control={<Radio />} label="Medium" onChange={handleChangeValues} />
      <FormControlLabel value="1" name='priority' control={<Radio />} label="High" onChange={handleChangeValues}/>
      
    </RadioGroup>
  </FormControl>
  );
}
