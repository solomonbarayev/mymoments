// const React, {createContext, useContext} = require('react');
import React, { createContext, useContext, useState, useEffect } from "react";

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [itemValues, setItemValues] = useState({ items: [] });
  const [customerValues, setCustomerValues] = useState({});
  const [price, setPrice] = useState(0);
  const [itemsIds, setItemIds] = useState([createUniqueId()]);

  function createUniqueId() {
    return Math.floor(Math.random() * 100000);
  }

  const addItem = () => {
    setItemIds([...itemsIds, createUniqueId()]);
  };

  const removeItem = (id) => {
    setItemIds((prev) => {
      const newArr = prev.filter((el) => el != id);
      return newArr.length >= 1 ? newArr : prev;
    });
  };

  const handleItemsChange = (e, id) => {
    //setItemValues({ ...ItemValues, [e.target.name]: e.target.value });

    //loop that checks the id and only updates that object
    // setItemValues((prevState) => {
    //   const newState = prevState;
    //   newState.items.push({ [e.target.name]: e.target.value });
    //   console.log(newState);
    //   return newState;
    // });

    itemValues.forEach((item) => {
      if (item.id == id) {
        //update state
      } else return;
    });
  };

  const handleCustomerChange = (e) => {
    setCustomerValues({ ...customerValues, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (e) => {
    const { name, files } = e.target;

    console.log(e.target);
  };

  //   const caculatePrice = () => {
  //     const { category, color, size, amount } = formValues;
  //     const categoryPrice = data.categories.find(
  //       (cat) => cat.name === category
  //     ).price;
  //     const colorPrice = data.colors.find((col) => col.name === color).price;
  //     const sizePrice = data.sizes.find((siz) => siz.name === size).price;
  //     const amountPrice = amount * 10;
  //     const price = categoryPrice + colorPrice + sizePrice + amountPrice;
  //     setPrice(price);
  //   };

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
