import React, { useEffect } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useForm } from "../contexts/FormContext";

const ToggleButtons = ({ itemId }) => {
  const [alignment, setAlignment] = React.useState("front");
  const { handleTypeOfPrint } = useForm();
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  useEffect(() => {
    console.log(itemId);
    handleTypeOfPrint(itemId, alignment);
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
      <ToggleButton value="doubleSided">הדפס דו-צדדי</ToggleButton>
      <ToggleButton value="exclude">התאמה אישית</ToggleButton>
    </ToggleButtonGroup>
  );
};

export default ToggleButtons;
