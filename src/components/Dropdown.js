import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useForm } from "../contexts/FormContext.js";

const Dropdown = ({ list, name, label }) => {
  const { formValues, handleChange: changeEvent } = useForm();
  const [value, setValue] = useState("");
  const handleChange = (event) => {
    console.log(event.target.value);
    changeEvent(event);
  };
  return (
    <Box>
      <FormControl sx={{ minWidth: 225 }}>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={formValues[name]}
          label={label}
          onChange={handleChange}
          name={name}
        >
          {list.map((listItem, i) => (
            <MenuItem key={i} value={listItem}>
              {listItem}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default Dropdown;
