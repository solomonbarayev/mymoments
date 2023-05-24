import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const Input = ({ formValues, handleChange, name, label }) => {
  return (
    <Box
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-basic"
        label={label}
        variant="outlined"
        name={name}
        value={formValues?.name}
        onChange={handleChange}
      />
    </Box>
  );
};

export default Input;
