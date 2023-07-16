import React from 'react';
import { Input } from 'antd';
const { TextArea } = Input;

const AntDTextArea = ({ itemId, handleChange }) => (
  <TextArea
    onChange={(e) => handleChange(itemId, e.target.value)}
    rows={6}
    className="form__notes"
  />
);
export default AntDTextArea;
