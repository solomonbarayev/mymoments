// const React, {createContext, useContext} = require('react');
import React, { createContext, useContext, useState, useReducer } from 'react';
import reducer from '../reducers/FormReducer';
import { initialState, createUniqueId } from '../constants/constants';
import { useValidation } from './FormValidation';

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    handleValidations,
    updateSubItemErrors,
    itemErrors,
    subItemErrors,
    handleSubItemError,
    handleItemErrors,
  } = useValidation();

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
      type: 'ADD_ITEM',
      payload: { itemId: createUniqueId(), subItemId: createUniqueId() },
    });
  };

  const removeItem = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const handleTypeOfPrint = (itemId, alignment) => {
    dispatch({
      type: 'UPDATE_PRINT_TYPE',
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
      type: 'UPDATE_ITEM',
      payload: { id, name: e.target.name, value: e.target.value },
    });
  };

  const handleShippingChange = (shipping) => {
    dispatch({
      type: 'UPDATE_SHIPPING',
      payload: shipping,
    });
  };

  const handleAddSubItem = (itemId) => {
    const subItemId = createUniqueId();
    dispatch({
      type: 'ADD_SUB_ITEM',
      payload: {
        itemId,
        value: { subItemId, subItemCount: 0 },
      },
    });
  };

  const handleRemoveSubItem = (itemId, subItemId) => {
    dispatch({
      type: 'REMOVE_SUB_ITEM',
      payload: { itemId, subItemId },
    });
  };

  const handleUpdateSubitem = (e, itemId, subItemId) => {
    handleValidations(e, subItemId); //enable from useValidation hook
    handleSubItemError(subItemId, e.target.name, e.target.value);

    dispatch({
      type: 'UPDATE_SUB_ITEM',
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
      type: 'UPDATE_CUSTOMER',
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
      type: 'UPDATE_FILE',
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
      type: 'UPDATE_ITEM',
      payload: { name: 'category', id, value: category },
    });
  };

  function handleUpdateOrderNotes(text) {
    console.log('in here');
    dispatch({ type: 'UPDATE_ORDER_NOTES', payload: text });
  }

  function handleCustomText(text, itemId) {
    dispatch({
      type: 'UPDATE_FILE',
      payload: {
        itemId,
        printType: 4,
        noPrint: text,
      },
    });
  }

  function handleRemoveAllFiles(itemId) {
    dispatch({
      type: 'REMOVE_ALL_FILES',
      payload: { itemId },
    });
  }

  function checkCategoryForEach() {
    return itemValues.every(
      (item) => item.category != undefined && item.category != ''
    );
  }

  function checkTypeOfPrintForEach() {
    return itemValues.every(
      (item) => item.typeOfPrint != undefined && item.typeOfPrint != ''
    );
  }

  function checkAllSubItemSizeAndColor() {
    //if there is an error, then add error with proper key name to subItemErrors object
    let result = true;
    itemValues.forEach((item) =>
      item.subItems.forEach((subItem) => {
        console.log('yo');
        if (
          subItem.size != undefined &&
          subItem.size != '' &&
          subItem.color != undefined &&
          subItem.color != '' &&
          subItem.subItemCount != undefined &&
          subItem.subItemCount != ''
        ) {
          //clean up subItemErrors object
          const newSubItemErrors = {
            ...subItemErrors,
            [subItem.subItemId]: {
              ...subItemErrors[subItem?.subItemId],
              size: '',
              color: '',
            },
          };
          updateSubItemErrors(newSubItemErrors);
          // return true;
        } else {
          //add error to subItemErrors object
          const newSubItemErrors = {
            ...subItemErrors,
            [subItem.subItemId]: {
              ...subItemErrors[subItem?.subItemId],
              size:
                subItem.size == undefined || subItem.size == ''
                  ? 'חובה לבחור מידה'
                  : '',
              color:
                subItem.color == undefined || subItem.color == ''
                  ? 'חובה לבחור צבע'
                  : '',
              subItemCount:
                subItem.subItemCount == undefined || subItem.subItemCount == ''
                  ? 'שדה חובה'
                  : '',
            },
          };
          updateSubItemErrors(newSubItemErrors);
          // return false;
          result = false;
        }
      })
    );
    return result;
  }

  function checkThatPrintHasSizeSelected() {
    return itemValues.every((item) => {
      if (item.typeOfPrint == 'exclude') return true;
      else {
        const front = item.prints.frontPrint;
        const back = item.prints.backPrint;
        let result = false;
        if (front.file !== '') {
          result = front.printSize !== '';
        }
        if (back.file !== '') {
          result = back.printSize !== '';
        }
        const event = {
          target: {
            name: 'printSize',
            value: 'חובה לבחור מידת הדפסה',
          },
        };
        console.log('in checkThatPrintHasSizeSelected');
        console.log(event);
        result == false && handleItemErrors(event, item.id);
        return result;
      }
    });
  }

  function checkInnerErrorsObjEmpty(errObj) {
    let result = true;
    if (JSON.stringify(errObj) == '{}') return result;
    else {
      const keys = Object.keys(errObj);
      keys.forEach((key) => {
        const innerKeys = Object.keys(errObj[key]);
        innerKeys.forEach((innerKey) => {
          if (errObj[key][innerKey] != '' && errObj[key][innerKey] != undefined)
            result = false;
        });
      });
      return result;
    }
  }

  function checkOuterErrorsObjEmpty(errObj) {
    console.log(errObj);
    return Object.values(errObj).every((el) => el == '' || el == undefined);
  }

  function validateSubitemCountMatches() {
    return itemValues.every((item) => {
      const subItemCount = item.subItems.reduce(
        (accumulator, next) => accumulator + +next.subItemCount,
        0
      );
      return subItemCount == item.itemCount;
    });
  }

  function checkIfAnyErrors(itemId) {
    const item = itemValues.find((el) => el.id == itemId);
    const subItems = item.subItems.map((el) => el.subItemId);

    let hasErrors = false;

    if (itemErrors[itemId] != undefined) {
      const itemErrorValues = Object.values(itemErrors[itemId]);
      if (itemErrorValues.some((el) => el != '')) hasErrors = true;
    }

    if (subItems.length > 0) {
      subItems.forEach((subItemId) => {
        if (subItemErrors[subItemId] != undefined) {
          const subItemErrorValues = Object.values(subItemErrors[subItemId]);
          if (subItemErrorValues.some((el) => el != '')) hasErrors = true;
        }
      });
    }

    return hasErrors;
  }

  return (
    <FormContext.Provider
      value={{
        handleCustomerChange,
        checkIfAnyErrors,
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
        checkCategoryForEach,
        checkTypeOfPrintForEach,
        checkAllSubItemSizeAndColor,
        checkThatPrintHasSizeSelected,
        checkInnerErrorsObjEmpty,
        checkOuterErrorsObjEmpty,
        validateSubitemCountMatches,
      }}>
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => useContext(FormContext);
