import React, { useState } from "react";
import Dropdown from "./Dropdown";
import { data } from "../data/data";
import { useForm } from "../contexts/FormContext";
import Input from "./Input";
import { BsDashCircle, BsPlusCircle } from "react-icons/bs";

const colors = data.colors;
const sizes = data.sizes;

const CustomOptions = ({ itemCount, itemId, subItemId, subItem }) => {
  const useColors = itemCount > 10 ? colors : ["שחור", "לבן"];
  const { items, handleUpdateSubitem, handleAddSubItem, handleRemoveSubItem } =
    useForm();
  const item = items.filter((item) => itemId == item.id)[0];
  const subItems = item.subItems;
  const subItemIds = subItems.map((el) => el.subItemId);

  function handleSubItemCount(e, subId) {
    handleUpdateSubitem(e, itemId, subId);
  }
  console.log(
    "subitme",
    item.subItems.filter((el) => el.subItemId == subItemId)[0]
  );
  return (
    <>
      <section className="options" key={subItemId}>
        <div className="options__btn-container">
          <button
            type="button"
            className="form__sub-item-btn form__sub-item-btn_type_remove"
            onClick={() => handleRemoveSubItem(itemId, subItemId)}
          >
            <BsDashCircle style={{ color: "#19448b" }} size={20} />
          </button>
          <button
            type="button"
            className="form__sub-item-btn form__sub-item-btn_type_add"
            onClick={(e) => {
              e.preventDefault();
              handleAddSubItem(itemId);
            }}
          >
            <BsPlusCircle style={{ color: "#19448b" }} size={20} />
          </button>
        </div>
        <div className="options__panel options__panel_side_right">
          <Dropdown
            list={sizes}
            name="size"
            label="מידה"
            formValues={subItem.size}
            handleChange={(e) => handleUpdateSubitem(e, itemId, subItemId)}
          />
        </div>
        <div className="options__panel options__panel_side_left">
          <Dropdown
            list={useColors}
            name="color"
            label="צבע"
            formValues={subItem.color}
            handleChange={(e) => handleUpdateSubitem(e, itemId, subItemId)}
          />
        </div>
        <div className="options__panel options__panel_side_center">
          <Input
            type="tel"
            label="כמות המידה הרצויה"
            name="subItemCount"
            handleChange={(e) => handleSubItemCount(e, subItemId)}
            formValues={subItem.subItemCount}
          />
        </div>
      </section>
    </>
  );
};

export default CustomOptions;
