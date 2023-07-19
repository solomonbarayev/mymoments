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
import { useValidation } from "./FormValidation";

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { handleValidations } = useValidation();

  console.log(state);

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
    dispatch({
      type: "UPDATE_PRINT_TYPE",
      payload: {
        itemId,
        value: alignment,
      },
    });
  };

  const handleItemsChange = (e, id) => {
    // handleValidations(e); //enable from useValidation hook
    handleValidations(e, id);
    dispatch({
      type: "UPDATE_ITEM",
      payload: { id, name: e.target.name, value: e.target.value },
    });
  };

  const handleShippingChange = (shipping) => {
    dispatch({
      type: "UPDATE_SHIPPING",
      payload: shipping,
    });
  };

  const handleAddSubItem = (itemId) => {
    const subItemId = createUniqueId();
    dispatch({
      type: "ADD_SUB_ITEM",
      payload: {
        itemId,
        value: { subItemId, subItemCount: 0 },
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
    handleValidations(e, subItemId); //enable from useValidation hook
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

  const handleCustomerChange = (e) => {
    handleValidations(e); //enable from useValidation hook
    dispatch({
      type: "UPDATE_CUSTOMER",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const handleFileUpload = ({
    itemId,
    base64,
    type,
    subType,
    text,
    printSize,
    category,
  }) => {
    dispatch({
      type: "UPDATE_FILE",
      payload: {
        itemId,
        value: base64,
        printType: type,
        subType,
        category,
        noPrint: {
          text,
        },
        printSize,
      },
    });
  };

  const handleCategoryUpdate = (e, id, category) => {
    dispatch({
      type: "UPDATE_ITEM",
      payload: { name: "category", id, value: category },
    });
  };

  function handleUpdateOrderNotes(text) {
    console.log("in here");
    dispatch({ type: "UPDATE_ORDER_NOTES", payload: text });
  }

  function handleCustomText(text, itemId) {
    console.log("in here", "text: " + text);
    dispatch({
      type: "UPDATE_FILE",
      payload: {
        itemId,
        printType: 4,
        noPrint: text,
      },
    });
  }

  function handleRemoveAllFiles(itemId) {
    dispatch({
      type: "REMOVE_ALL_FILES",
      payload: { itemId },
    });
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
        handleCategoryUpdate,
        items: state.items,
        createUniqueId,
        handleUpdateSubitem,
        handleAddSubItem,
        handleRemoveSubItem,
        handleUpdateOrderNotes,
        handleTypeOfPrint,
        handleCustomText,
        handleRemoveAllFiles,
        handleShippingChange,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => useContext(FormContext);
