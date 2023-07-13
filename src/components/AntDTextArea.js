import React from "react";
import { Input } from "antd";
const { TextArea } = Input;

const AntDTextArea = ({ handleChange }) => (
  <TextArea onChange={handleChange} rows={6} className="form__notes" />
);
export default AntDTextArea;
