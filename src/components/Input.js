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
  validationMessage = "",
  maxLength,
}) => {
  return (
    <div className="form__input">
      <TextField
        id="outlined-basic"
        label={label}
        variant="outlined"
        name={name}
        value={formValues || ""}
        onChange={handleChange}
        type={type ? type : "text"}
        inputProps={{ maxLength: maxLength }}
        helperText={validationMessage}
        error={validationMessage != ""}
      />
    </div>
  );
};

export default Input;
