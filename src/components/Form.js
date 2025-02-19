import React, { useState, useEffect } from "react";
import Dropdown from "./Dropdown.js";
import { data } from "../data/data.js";
import Input from "./Input.js";
import { useForm } from "../contexts/FormContext.js";
import FileUpload from "./FileUpload.js";
import { BsFillTrash3Fill } from "react-icons/bs";
import { AiOutlinePlusCircle } from "react-icons/ai";

// const cats = data.categories;
let { categories: cats, colors: cols, sizes: siz } = data;
cats = cats.map((cat) => cat.name);

const Form = () => {
  const [categories, setCategories] = useState(cats);
  const [colors, setColors] = useState(cols);
  const [sizes, setSizes] = useState(siz);
  const {
    itemValues,
    customerValues,
    handleItemsChange,
    handleCustomerChange,
    handleFileUpload,
    itemsIds,
    addItem,
    removeItem,
    totalPrice,
    isTelError,
    telValidationMess,
  } = useForm();

  return (
    <form className="form">
      {itemsIds.map((el, i) => (
        <section
          item-index={el}
          key={el}
          className="form__section form__section_type_product"
        >
          <h2 className="form__product-title">הדפסה {i + 1}</h2>
          <div className="form__group">
            <div className="form__dropdowns">
              <Dropdown
                list={categories}
                name="category"
                label="סוג חולצה"
                formValues={itemValues[i]?.category}
                handleChange={(e) => handleItemsChange(e, el)}
              />
              <Dropdown
                list={colors}
                name="color"
                label="צבע"
                formValues={itemValues[i]?.color}
                handleChange={(event) => handleItemsChange(event, el)}
              />
              <Dropdown
                list={sizes}
                name="size"
                label="מידה"
                formValues={itemValues[i]?.size}
                handleChange={(event) => handleItemsChange(event, el)}
              />
            </div>
            <Input
              name="amount"
              label="כמות"
              formValues={itemValues[i]?.amount}
              handleChange={(event) => handleItemsChange(event, el)}
            />
          </div>
          <div className="form__group form__group_type_images">
            <FileUpload name="image1" label="הדפס קידמי" />
            <FileUpload name="image2" label="הדפס אחורי" />
          </div>
          {itemsIds.length == 1 ? null : (
            <button
              type="button"
              className="form__remove-item-btn"
              onClick={() => removeItem(el)}
            >
              <BsFillTrash3Fill />
            </button>
          )}
        </section>
      ))}
      <button
        type="button"
        className="btn btn-primary form__add-btn"
        onClick={() => addItem()}
      >
        הוסף הדפסה <AiOutlinePlusCircle />
      </button>
      <div className="form__price-container">
        <p className="form__price">
          <span className="form__price-label">מחיר סופי: &#8362;</span>
          {totalPrice}
        </p>
      </div>
      <section className="form__section form__section_type_customer">
        <h2 className="form__product-title">פרטי לקוח</h2>
        <div className="form__group form__group_type_customer">
          <Input
            name="firstName"
            label="שם פרטי"
            formValues={customerValues}
            handleChange={handleCustomerChange}
          />
          <Input
            name="lastName"
            label="שם משפחה"
            formValues={customerValues}
            handleChange={handleCustomerChange}
          />
          <Input
            name="address"
            label="כתובת למשלוח"
            formValues={customerValues}
            handleChange={handleCustomerChange}
          />
          <Input
            name="city"
            label="עיר מגורים"
            formValues={customerValues}
            handleChange={handleCustomerChange}
          />
          <Input
            name="phone"
            maxlength="14"
            label="טלפון"
            formValues={customerValues}
            handleChange={handleCustomerChange}
            validationMessage={"..."}
          />
          <Input
            name="email"
            type="email"
            label="אימייל"
            formValues={customerValues}
            handleChange={handleCustomerChange}
          />
        </div>
      </section>

      <button type="submit">שלח</button>
    </form>
  );
};

export default Form;
