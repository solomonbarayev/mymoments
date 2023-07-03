import React, { useRef, useState } from "react";
import Tshirt from "../assets/Tshirt.jpg";
import hat from "../assets/hat.jpg";
import wifebeater from "../assets/wifebeater.jpg";
import dryfit from "../assets/dryfit.jpg";
import { useForm } from "../contexts/FormContext.js";

const categories = [
  {
    name: "כותנה",
    image: Tshirt,
  },
  {
    name: "דרייפיט",
    image: dryfit,
  },
  {
    name: "גופיות",
    image: wifebeater,
  },
  {
    name: "כובעים",
    image: hat,
  },
];

// import required modules

export default function CategoryPicker({ id }) {
  const [selection, setSelection] = useState("");

  const { handleCategoryUpdate, items } = useForm();

  function handleCategoryClick(e, category) {
    //check for id == item.id and category == item.category. yes - true, no false;
    setSelection(category);
    handleCategoryUpdate(e, id, category);
  }

  return (
    <div className="form__categories">
      {categories.map((category) => (
        <div
          key={category.name}
          onClick={(e) => handleCategoryClick(e, category.name)}
          className={`form__category-item ${
            category.name == selection ? "form__category-item_active" : ""
          }`}
        >
          {category.name}
          <img className="form__category-img" src={category.image} />
        </div>
      ))}
    </div>
  );
}
