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

  return (
    <form className="form">
      <div className="form__group form__group_type_product">
        <Dropdown list={categories} name="category" label="סוג חולצה" />
        <Dropdown list={colors} name="color" label="צבע" />
        <Dropdown list={sizes} name="size" label="מידה" />

        <Input name="amount" label="כמות" />
        <Input name="price" label="מחיר" />
      </div>
      <div className="form__group form__group_type_images">
        <FileUpload name="image1" label="הדפס קידמי" />
        <FileUpload name="image2" label="הדפס אחורי" />
      </div>
      <div className="form__group form__group_type_customer">
        <Input name="firstName" label="שם פרטי" />
        <Input name="lastName" label="שם משפחה" />
        <Input name="address" label="כתובת למשלוח" />
        <Input name="phone" label="טלפון" />
        <Input name="email" label="אימייל" />
      </div>

      <button type="submit">שלח</button>
    </form>
  );
};

export default Form;
