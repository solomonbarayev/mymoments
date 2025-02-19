// const React, {createContext, useContext} = require('react');
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useReducer,
} from "react";
import reducer from "../reducers/reducer";

const FormContext = createContext();

function createUniqueId() {
  return Math.floor(Math.random() * 100000);
}

const initalIndex = createUniqueId();

const initialState = {
  items: [],
  itemsIds: [initalIndex],
  customerData: {},
  totalPrice: 0,
};

const validateTel = /^[0-9]*$/;

export const FormProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isTelError, setIsTelError] = useState(false);
  const [telValidationMess, setTelValidationMess] = useState("");
  const [requiredMessages, setRequiredMessages] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
  });

  const [errMessages, setErrMessages] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    phone: "",
  });

  const {
    itemsIds,
    items: itemValues,
    totalPrice,
    customerData: customerValues,
  } = state;
  console.log(state);

  // const [itemValues, setItemValues] = useState([{ id: initalIndex }]);
  const [price, setPrice] = useState(0);
  // const [itemsIds, setItemIds] = useState([createUniqueId()]);
  // const [totalPrice, setTotalPrice] = useState(0);

  const addItem = () => {
    dispatch({ type: "ADD_ITEM", payload: createUniqueId() });
  };

  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  const handleTelErr = (e) => {
    let num = e.target.value.replaceAll("-", "");
    if (num == "") {
      setErrMessages({
        phone: "שדה חובה",
      });
    }
    if (!validateTel.test(num)) {
      setErrMessages({
        phone: "מספרים בלבד",
      });
      return;
    } else if (num.length != 10) {
      setErrMessages({
        phone: "לפחות עשר מספרים",
      });
      return;
    }
    setErrMessages({
      phone: "",
    });
  };

  const handleItemsChange = (e, id) => {
    dispatch({
      type: "UPDATE_ITEM",
      payload: { id, name: e.target.name, value: e.target.value },
    });
  };

  const handleRequired = (e) => {
    let newState = errMessages;

    if (e.target.value == "") {
      newState[e.target.name] = "שדה חובה";
    }
    setErrMessages(newState);
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

  const handleCustomerChange = (e) => {
    handleValidations(e);

    dispatch({
      type: "UPDATE_CUSTOMER",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const handleFileUpload = (e) => {
    const { name, files } = e.target;
    console.log(e.target);
  };

  useEffect(() => {
    const ids = itemsIds;
    const newItemsValues = itemValues;
    //whenever there is a new ID, initialize an object into itemValues with that id
    const exisitingIds = itemValues.map((el) => el.id);
    ids.forEach((id) => {
      if (!exisitingIds.includes(id)) {
        newItemsValues.push({ id });
      } else return;
    });
  }, [itemsIds, itemValues]);

  useEffect(() => {
    dispatch({ type: "CALCULATE_PRICE" });
  }, [itemValues]);

  return (
    <FormContext.Provider
      value={{
        handleCustomerChange,
        handleItemsChange,
        customerValues,
        handleFileUpload,
        itemValues,
        price,
        itemsIds,
        addItem,
        removeItem,
        totalPrice,
        telValidationMess,
        isTelError,
        requiredMessages,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => useContext(FormContext);
