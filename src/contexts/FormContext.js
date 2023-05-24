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
    setItemIds([...itemsIds, createUniqueId()]);
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
    //setItemValues({ ...ItemValues, [e.target.name]: e.target.value });

    //loop that checks the id and only updates that object
    // setItemValues((prevState) => {
    //   const newState = prevState;
    //   newState.items.push({ [e.target.name]: e.target.value });
    //   console.log(newState);
    //   return newState;
    // });

    itemValues.items.forEach((item) => {
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
  useEffect(() => {
    const ids = itemsIds;
    const newItemsValues = itemValues;
    //whenever there is a new ID, initialize an object into itemValues with that id
    console.log("ItemsIds: ", itemsIds);
    ids.forEach((id) => {
      itemValues.items.forEach((i) => {
        console.log("before else");
        if (i.id != id) {
          console.log("inside else");
          newItemsValues.items.push({ id });
        } else return;
      });
    });

    console.log(newItemsValues);
  }, [itemsIds]);

  useEffect(() => {
    console.log("ItemValues");
    console.log(itemValues);
  }, [itemValues]);
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
