import React, { useState } from "react";
import Dropdown from "./Dropdown";
import { data } from "../data/data";
import { useForm } from "../contexts/FormContext";

const colors = data.colors;
const sizes = data.sizes;

console.log(data.colors);

const CustomOptions = ({ itemCount, id }) => {
  const useColors = itemCount > 10 ? colors : ["שחור", "לבן"];
  const { items, handleItemsChange } = useForm();
  const item = items.filter((item) => id == item.id)[0];
  return (
    <section className="options">
      <div className="options__panel options__panel_side_right">
        <div className="options__size-grid">
          <div className="options__grid-item">S</div>
          <div className="options__grid-item">M</div>
          <div className="options__grid-item">L</div>
          <div className="options__grid-item">XL</div>
          <div className="options__grid-item">XXL</div>
          <div className="options__grid-item">XXXL</div>
          <div className="options__grid-item">
            <input
              type="text"
              inputMode="numeric"
              className="options__grid-item options__grid-item_input"
            />{" "}
          </div>
          <div className="options__grid-item">
            <input
              type="text"
              inputMode="numeric"
              className="options__grid-item options__grid-item_input"
            />{" "}
          </div>
          <div className="options__grid-item">
            <input
              type="text"
              inputMode="numeric"
              className="options__grid-item options__grid-item_input"
            />{" "}
          </div>
          <div className="options__grid-item">
            <input
              type="text"
              inputMode="numeric"
              className="options__grid-item options__grid-item_input"
            />{" "}
          </div>
          <div className="options__grid-item">
            <input
              type="text"
              inputMode="numeric"
              className="options__grid-item options__grid-item_input"
            />{" "}
          </div>
          <div className="options__grid-item">
            <input
              type="text"
              inputMode="numeric"
              className="options__grid-item options__grid-item_input"
            />{" "}
          </div>
        </div>
      </div>
      <div className="options__panel options__panel_side_left">
        <Dropdown
          list={useColors}
          name="color"
          label="צבע"
          formValues={item?.color}
          handleChange={(event) => handleItemsChange(event, id)}
        />
      </div>
    </section>
  );
};

export default CustomOptions;

/* <section
                  item-index={el}
                  key={el}
                  className="form__section form__section_type_product"
                >
                  <div className="form__group">
                    <div className="form__dropdowns">
                      <Dropdown
                        list={categories}
                        name="category"
                        label="סוג חולצה"
                        formValues={itemValues[i]?.category}
                        handleChange={(e) => handleItemsChange(e, el)}
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
                </section> */
