import * as mdb from "mdb-ui-kit"; // lib
import { Input } from "mdb-ui-kit"; // module

import React from "react";

const FileUpload = ({ name, label }) => {
  const fd = new FormData();

  const handleChange = (e) => {
    console.log(e);
  };
  return (
    <>
      <div>
        <label className="form-label" htmlFor="customFile">
          {label}
        </label>
        <input
          onChange={handleChange}
          type="file"
          className="form-control"
          id="customFile"
          name={name}
        />
      </div>
    </>
  );
};

export default FileUpload;
