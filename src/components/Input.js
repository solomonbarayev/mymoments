import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { formControlClasses } from "@mui/material";

const Input = ({
  formValues,
  handleChange,
  name,
  label,
  type,
  validationMessage,
}) => {
  return (
    // <Box
    //   sx={{
    //     "& > :not(style)": { m: 0, width: "26ch" },
    //   }}
    //   noValidate
    //   autoComplete="off"
    // >

    <div className="form__input">
      <TextField
        id="outlined-basic"
        label={label}
        variant="outlined"
        name={name}
        value={formValues || ""}
        onChange={handleChange}
        type={type ? type : "text"}
      />
      {validationMessage ? (
        <span className="form__input-validation">{validationMessage}</span>
      ) : null}
    </div>
    // </Box>
  );
};

export default Input;
