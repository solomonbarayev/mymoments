//form validation useValidation hook
import { createContext, useContext, useState, useEffect } from "react";
import { validateTel } from "../constants/constants";

const FormValidationContext = createContext();

export const FormValidationProvider = ({ children }) => {
  const [errors, setError] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    phone: "",
    itemCount: "",
  });

  const [itemErrors, setItemError] = useState({});
  const [subItemErrors, setSubItemError] = useState({});

  const handleRequired = (e) => {
    let newState = errors;

    newState[e.target.name] = e.target.value == "" ? "שדה חובה" : "";
    setError(newState);
  };

  const handleNumInput = (e) => {
    const { name } = e.target;
    let num = e.target.value.replaceAll("-", "");
    if (num == "") {
      setError({
        [name]: "שדה חובה",
      });
    }
    if (!validateTel.test(num)) {
      setError({
        [name]: "מספרים בלבד",
      });
    } else if (num.length != 10 && name == "phone") {
      setError({
        [name]: "לפחות עשר מספרים",
      });
      return;
    }
    setError({
      [name]: "",
    });
  };

  function buildNumMessage(value) {
    let message = "";
    if (value == "") {
      message = "שדה חובה";
    } else if (!validateTel.test(value)) {
      message = "מספרים בלבד";
    } else {
      message = "";
    }
    return message;
  }

  const handleItemErrors = (e, id) => {
    const { name } = e.target;
    let newState = itemErrors;
    newState[id] = {
      ...newState[id],
      [name]: buildNumMessage(e.target.value),
    };
    setItemError(newState);
  };

  const handleSubItemErrors = (e, id) => {
    const { name } = e.target;
    let newState = subItemErrors;
    newState[id] = {
      ...newState[id],
      [name]: buildNumMessage(e.target.value),
    };
    setSubItemError(newState);
  };

  const handleValidations = (e, id) => {
    const { name } = e.target;
    const validationObject = {
      phone: handleNumInput,
      fullName: handleRequired,
      address: handleRequired,
      city: handleRequired,
      email: handleRequired,
      itemCount: handleItemErrors,
      subItemCount: handleSubItemErrors,
    };
    validationObject[name]?.(e, id);
  };

  return (
    <FormValidationContext.Provider
      value={{ errors, handleValidations, itemErrors, subItemErrors }}
    >
      {children}
    </FormValidationContext.Provider>
  );
};

export const useValidation = () => useContext(FormValidationContext);
