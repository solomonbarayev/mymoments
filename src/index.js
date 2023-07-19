import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { FormProvider } from "./contexts/FormContext.js";
import { FormValidationProvider } from "./contexts/FormValidation.js";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <FormValidationProvider>
    <FormProvider>
      <App />
    </FormProvider>
  </FormValidationProvider>
  // </React.StrictMode>
);
