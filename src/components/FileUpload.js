import React from "react";
import { useForm } from "../contexts/FormContext";

export default function FileUpload({ name, label }) {
  const { handleFileUpload } = useForm();

  return (
    <>
      <label className="form__label form__label_file" htmlFor={name}>
        {label}
      </label>
      <input
        type="file"
        accept=".jpg, .jpeg, .png, .gif, .bmp, .svg"
        name={name}
        id={name}
        onChange={handleFileUpload}
      />
    </>
  );
}
