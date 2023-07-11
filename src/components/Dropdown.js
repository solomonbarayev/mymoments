import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const Dropdown = ({ list, name, label, formValues, value, handleChange }) => {
  return (
    <Box sx={{ dir: 'rtl', width: '100%' }}>
      <FormControl sx={{ minWidth: 150, width: '100%' }}>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={formValues == undefined ? '' : formValues}
          label={label}
          onChange={handleChange}
          name={name}
          defaultValue="">
          {list.map((listItem, i) => (
            <MenuItem
              key={i}
              value={listItem}
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}>
              {listItem}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default Dropdown;
