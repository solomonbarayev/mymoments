import React, { useState, useEffect } from "react";
import Dropdown from "./Dropdown.js";
import { data } from "../data/data.js";
import Input from "./Input.js";
import { useForm } from "../contexts/FormContext.js";
import FileUpload from "./FileUpload.js";

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
    price,
    handleItemsChange,
    handleCustomerChange,
    handleFileUpload,
    itemsIds,
    addItem,
    removeItem,
  } = useForm();

  return (
    <form className="form">
      {itemsIds.map((el) => (
        <section item-index={el} key={el}>
          <div className="form__group form__group_type_product">
            <Dropdown
              list={categories}
              name="category"
              label="סוג חולצה"
              formValues={itemValues}
              handleChange={(e) => handleItemsChange(e, el)}
            />

            <Input
              name="amount"
              label="כמות"
              formValues={itemValues.items[0]}
              handleChange={(event) => handleItemsChange(event, el)}
            />

            <Dropdown
              list={colors}
              name="color"
              label="צבע"
              formValues={itemValues}
              handleChange={(event) => handleItemsChange(event, el)}
            />
            <Dropdown
              list={sizes}
              name="size"
              label="מידה"
              formValues={itemValues}
              handleChange={(event) => handleItemsChange(event, el)}
            />
          </div>
          <div className="form__group form__group_type_images">
            <FileUpload name="image1" label="הדפס קידמי" />
            <FileUpload name="image2" label="הדפס אחורי" />
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => removeItem(el)}
          >
            מחק הדפסה
          </button>
        </section>
      ))}
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => addItem()}
      >
        הוסף הדפסה
      </button>
      <input name="price" label="מחיר" disabled={true} />
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
          name="phone"
          label="טלפון"
          formValues={customerValues}
          handleChange={handleCustomerChange}
        />
        <Input
          name="email"
          label="אימייל"
          formValues={customerValues}
          handleChange={handleCustomerChange}
        />
      </div>

      <button type="submit">שלח</button>
    </form>
  );
};

export default Form;
