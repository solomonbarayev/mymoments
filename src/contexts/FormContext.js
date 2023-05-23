// const React, {createContext, useContext} = require('react');
import React, { createContext, useContext, useState, useEffect } from "react";

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formValues, setFormValues] = useState({});
  const [price, setPrice] = useState(0);
  const handleChange = (e) => {
    console.log(e);
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (e) => {
    const { name, files } = e.target;

    console.log(e.target);
    setFormValues({ ...formValues, [name]: files[0] });
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
    console.log(formValues);
  }, [formValues]);

  return (
    <FormContext.Provider
      value={{ formValues, handleChange, handleFileUpload, price }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => useContext(FormContext);
