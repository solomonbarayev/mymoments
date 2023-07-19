//form validation useValidation hook
import { createContext, useContext, useState, useEffect } from "react";
import { validateTel } from "../constants/constants";

const FormValidationContext = createContext();

export const FormValidationProvider = ({ children }) => {
  const [errors, setError] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    phone: "",
  });

  const handleRequired = (e) => {
    let newState = errors;

    if (e.target.value == "") {
      newState[e.target.name] = "שדה חובה";
    }
    setError(newState);
  };

  const handleTelErr = (e) => {
    let num = e.target.value.replaceAll("-", "");
    if (num == "") {
      setError({
        phone: "שדה חובה",
      });
    }
    if (!validateTel.test(num)) {
      setError({
        phone: "מספרים בלבד",
      });
      return;
    } else if (num.length != 10) {
      setError({
        phone: "לפחות עשר מספרים",
      });
      return;
    }
    setError({
      phone: "",
    });
  };

  const handleValidations = (e) => {
    const { name } = e.target;
    const validationObject = {
      phone: handleTelErr,
      firstName: handleRequired,
      lastName: handleRequired,
      address: handleRequired,
      city: handleRequired,
      email: handleRequired,
    };
    validationObject[name]?.(e);
  };

  return (
    <FormValidationContext.Provider
      value={{ errors, handleValidations, handleTelErr, handleRequired }}
    >
      {children}
    </FormValidationContext.Provider>
  );
};

export const useValidation = () => useContext(FormValidationContext);
