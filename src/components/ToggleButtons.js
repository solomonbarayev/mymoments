import React, { useEffect } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const ToggleButtons = (props) => {
  const [alignment, setAlignment] = React.useState("front");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  useEffect(() => {
    console.log(alignment);
  }, [alignment]);

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
      className="form__toggle"
    >
      <ToggleButton value="front">הדפס קדימה</ToggleButton>
      <ToggleButton value="back">הדפס אחורה</ToggleButton>
    </ToggleButtonGroup>
  );
};

export default ToggleButtons;
