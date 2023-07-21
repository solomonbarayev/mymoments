import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';

const Dropdown = ({
  list,
  name,
  label,
  formValues,
  handleChange,
  validationMessage = '',
}) => {
  return (
    <Box sx={{ dir: 'rtl', width: '100%' }}>
      <FormControl
        sx={{ minWidth: 150, width: '100%' }}
        error={validationMessage != ''}>
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
        {validationMessage != '' && (
          <FormHelperText>{validationMessage}</FormHelperText>
        )}
      </FormControl>
    </Box>
  );
};

export default Dropdown;
