import React, { useState } from "react";
import Dropdown from "./Dropdown";
import { data } from "../data/data";
import { useForm } from "../contexts/FormContext";
import Input from "./Input";
import { BsDashCircleFill } from "react-icons/bs";

const colors = data.colors;
const sizes = data.sizes;

console.log(data.colors);

const CustomOptions = ({ itemCount, id, subItemId }) => {
  const useColors = itemCount > 10 ? colors : ["שחור", "לבן"];
  const { items, handleItemsChange, createUniqueId, handleUpdateSubitem } =
    useForm();
  const item = items.filter((item) => id == item.id)[0];
  const subItem = item.subItems;
  const subItemIds = subItem.map((el) => el.subItemId);
  //   console.log(id);
  //   console.log(subItemId);
  return (
    <>
      {subItemIds.map((subId) => (
        <section className="options" key={subId}>
          <div className="options__panel_delete_button">
            <button
              type="button"
              className="form__remove-item-btn"
              //   onClick={() => removeItem(el)}
            >
              <BsDashCircleFill />
            </button>
          </div>
          <div className="options__panel options__panel_side_right">
            <Dropdown
              list={sizes}
              name="size"
              label="מידה"
              formValues={item?.color}
              handleChange={(event) => handleItemsChange(event, id)}
            />
          </div>
          <div className="options__panel options__panel_side_center">
            <Input
              type="tel"
              label="כמות המידה הרצויה"
              name="sizeCount"
              handleChange={(e) => handleUpdateSubitem(e, id, subId)}
            />
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
      ))}
    </>
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
