// const React, {createContext, useContext} = require('react');
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useReducer,
} from "react";
import reducer from "../reducers/reducer";
import { initialState, createUniqueId } from "../constants/constants";

const FormContext = createContext();

const initalIndex = createUniqueId();

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

  console.log(state);

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

  const [price, setPrice] = useState(0);

  const addItem = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: { itemId: createUniqueId(), subItemId: createUniqueId() },
    });
  };

  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  const handleTypeOfPrint = (itemId, alignment) => {
    console.log("itemid:" + itemId);
    dispatch({
      type: "UPDATE_FILE",
      payload: {
        itemId,
        value: alignment,
      },
    });
  };
  const handlePrintChoiceChange = (e, options) => {
    dispatch({
      type: "UPDATE_FILE",
      payload: {
        name: e.target.name,
        itemId: options.itemId,
        printType: options.printType,
        printSize: options.printSize,
        noPrint: {
          front: {
            wording: options.noPrint.front.wording,
            size: options.noPrint.front.printSize,
          },
          back: {
            wording: options.noPrint.back.wording,
            size: options.noPrint.back.printSize,
          },
        },
      },
    });
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

  const handleAddSubItem = (itemId) => {
    dispatch({
      type: "ADD_SUB_ITEM",
      payload: {
        itemId,
        value: { subItemId: createUniqueId(), subItemCount: 0 },
      },
    });
  };

  const handleRemoveSubItem = (itemId, subItemId) => {
    dispatch({
      type: "REMOVE_SUB_ITEM",
      payload: { itemId, subItemId },
    });
  };

  const handleUpdateSubitem = (e, itemId, subItemId) => {
    dispatch({
      type: "UPDATE_SUB_ITEM",
      payload: {
        itemId,
        subItemId,
        name: e.target.name,
        value: e.target.value,
      },
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

  const handleCategoryUpdate = (e, id, category) => {
    dispatch({
      type: "UPDATE_ITEM",
      payload: { name: "category", id, value: category },
    });
  };

  function handleCalculateTotalPrice() {
    dispatch({ type: "CALCULATE_PRICE" });
  }

  function handleUpdateOrderNotes(e) {
    dispatch({ type: "UPDATE_ORDER_NOTES", payload: e.target.value });
  }

  return (
    <FormContext.Provider
      value={{
        handleCustomerChange,
        handleItemsChange,
        customerValues,
        handleFileUpload,
        itemValues,
        price,
        itemsIds: state.items.map((el) => el.id),
        addItem,
        removeItem,
        totalPrice,
        telValidationMess,
        isTelError,
        requiredMessages,
        handleCategoryUpdate,
        items: state.items,
        createUniqueId,
        handleUpdateSubitem,
        handleAddSubItem,
        handleRemoveSubItem,
        handleCalculateTotalPrice,
        handleUpdateOrderNotes,
        handlePrintChoiceChange,
        handleTypeOfPrint,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => useContext(FormContext);
