import React, { useState } from "react";
import { Radio } from "antd";
import { useForm } from "../contexts/FormContext";

const RadioGroup = ({ itemId, type, typeNum, subType, category }) => {
  const [value, setValue] = useState();

  const { handleFileUpload } = useForm();

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
    handleFileUpload({
      itemId,
      base64: "",
      type: typeNum,
      subType,
      text: "",
      printSize: e.target.value,
    });
  };
  return (
    <>
      {category != "כובעים" ? (
        <Radio.Group onChange={onChange} value={value}>
          <Radio value={1}>סמל קטן (בגודל הכיס)</Radio>
          <Radio value={2}>סמל גדול (בגודל A4)</Radio>
        </Radio.Group>
      ) : null}
    </>
  );
};
export default RadioGroup;
