import React from 'react';
import { Input } from 'antd';
const { TextArea } = Input;

const AntDTextArea = ({ handleChange }) => (
  <TextArea
    onChange={(e) => {
      handleChange(e.target.value);
    }}
    rows={6}
    className="form__notes"
  />
);
export default AntDTextArea;
