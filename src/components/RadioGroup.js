import React, { useState } from "react";
import { Radio } from "antd";
import { useForm } from "../contexts/FormContext";

const RadioGroup = ({ itemId, type, typeNum, subType }) => {
  const [value, setValue] = useState();

  const { handleFileUpload } = useForm();

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
    handleFileUpload(itemId, "", typeNum, subType, "", e.target.value);
  };
  return (
    <Radio.Group onChange={onChange} value={value}>
      <Radio value={1}>סמל קטן (בגודל הכיס)</Radio>
      <Radio value={2}>סמל גדול (בגודל A4)</Radio>
    </Radio.Group>
  );
};
export default RadioGroup;
