import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const Input = ({ formValues, handleChange, name, label, type }) => {
  return (
    <Box
      sx={{
        "& > :not(style)": { m: 0, width: "26ch" },
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
        type={type ? type : "text"}
      />
    </Box>
  );
};

export default Input;
