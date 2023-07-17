import React, { useEffect } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useForm } from '../contexts/FormContext';

const ToggleButtons = ({ itemId, category }) => {
  const [alignment, setAlignment] = React.useState('front');
  const { handleTypeOfPrint, handleRemoveAllFiles } = useForm();
  const handleChange = (event, newAlignment) => {
    handleRemoveAllFiles(itemId);
    setAlignment(newAlignment);
  };

  useEffect(() => {
    console.log(alignment);
    handleTypeOfPrint(itemId, alignment);
  }, [alignment]);

  console.log(category);

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
      className="form__toggle">
      <ToggleButton value="front">הדפס קדימה</ToggleButton>
      {category !== 'כובעים' && (
        <ToggleButton value="back">הדפס אחורה</ToggleButton>
      )}
      {category !== 'כובעים' && (
        <ToggleButton value="doubleSided">הדפס דו-צדדי</ToggleButton>
      )}
      <ToggleButton value="exclude">התאמה אישית</ToggleButton>
    </ToggleButtonGroup>
  );
};

export default ToggleButtons;
