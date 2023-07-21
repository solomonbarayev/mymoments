//form validation useValidation hook
import { createContext, useContext, useState, useReducer } from 'react';
import reducer from '../reducers/ValidatonsReducer';
import { validateTel } from '../constants/constants';

const FormValidationContext = createContext();

export const FormValidationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    formErrors: {},
    itemErrors: {},
    subItemErrors: {},
  });

  const handleRequired = (e) => {
    dispatch({
      type: 'REQUIRED_FIELD',
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const handleNumInput = (e) => {
    dispatch({
      type: 'TEL_ERROR',
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const handleItemErrors = (e, id) => {
    dispatch({
      type: 'UPDATE_ITEM_ERRORS',
      payload: {
        id,
        name: e.target.name,
        value: e.target.value,
        type: 'itemErrors',
      },
    });
  };

  const handleSubItemErrors = (e, id) => {
    dispatch({
      type: 'UPDATE_ITEM_ERRORS',
      payload: {
        id,
        name: e.target.name,
        value: e.target.value,
        type: 'subItemErrors',
      },
    });
  };

  function updateSubItemErrors(newState) {
    dispatch({
      type: 'UPDATE_SUB_ITEM_ERRORS',
      payload: newState,
    });
  }

  function handleSubItemError(subItemId, name, value) {
    dispatch({
      type: 'UPDATE_SINGLE_SUB_ITEM_ERRORS',
      payload: { subItemId, name, value },
    });
  }

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
      value={{
        errors: state.formErrors,
        handleValidations,
        itemErrors: state.itemErrors,
        subItemErrors: state.subItemErrors,
        // setSubItemError,
        updateSubItemErrors,
        handleSubItemError,
      }}>
      {children}
    </FormValidationContext.Provider>
  );
};

export const useValidation = () => useContext(FormValidationContext);
