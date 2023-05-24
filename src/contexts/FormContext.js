// const React, {createContext, useContext} = require('react');
import React, { createContext, useContext, useState, useEffect } from "react";

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const initalIndex = createUniqueId();
  const [itemValues, setItemValues] = useState({
    items: [{ id: initalIndex }],
  });
  const [customerValues, setCustomerValues] = useState({});
  const [price, setPrice] = useState(0);
  const [itemsIds, setItemIds] = useState([initalIndex]);

  function createUniqueId() {
    return Math.floor(Math.random() * 100000);
  }

  const addItem = () => {
    // setItemIds([...itemsIds, createUniqueId()]);
    setItemIds((prevState) => {
      const newState = [...prevState, createUniqueId()];
      return newState;
    });
  };

  const removeItem = (id) => {
    setItemIds((prev) => {
      const newArr = prev.filter((el) => el != id);
      return newArr.length >= 1 ? newArr : prev;
    });

    setItemValues((prev) => {
      const newObj = prev;
      newObj.items = prev.items.filter((el) => el.id != id);
      return newObj;
    });
  };

  const handleItemsChange = (e, id) => {
    // const newState = itemValues;
    // itemValues.items.forEach((item) => {
    //   if (item.id == id) {
    //     //update state
    //     item[e.target.name] = e.target.value;
    //   } else return;
    // });

    // console.log(newState);
    // setItemValues(newState);

    setItemValues((prevState) => {
      const newState = prevState;
      newState.items.forEach((item) => {
        if (item.id == id) {
          item[e.target.name] = e.target.value;
        }
      });
      return newState;
    });
  };

  useEffect(() => {
    console.log("ItemValues");
    console.log(itemValues);
  }, [itemValues]);

  const handleCustomerChange = (e) => {
    setCustomerValues({ ...customerValues, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (e) => {
    const { name, files } = e.target;

    console.log(e.target);
  };

  useEffect(() => {
    const ids = itemsIds;
    const newItemsValues = itemValues;
    //whenever there is a new ID, initialize an object into itemValues with that id
    const exisitingIds = itemValues.items.map((el) => el.id);
    console.log(exisitingIds);

    ids.forEach((id) => {
      itemValues.items.forEach((item) => {
        console.log(item);
        if (!exisitingIds.includes(id)) {
          newItemsValues.items.push({ id });
        } else return;
      });
    });
    // newItemsValues.items.push(objToAdd);
    setItemValues(newItemsValues);
  }, [itemsIds, itemValues]);

  useEffect(() => {
    console.log(itemsIds);
  }, [itemsIds]);

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
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => useContext(FormContext);
