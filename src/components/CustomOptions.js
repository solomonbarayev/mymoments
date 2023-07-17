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

  return (
    <>
      <section className="options" key={subItemId}>
        <div className="options__btn-container">
          {item.subItems.length != 1 && (
            <button
              type="button"
              className="form__sub-item-btn form__sub-item-btn_type_remove"
              onClick={() => handleRemoveSubItem(itemId, subItemId)}
            >
              <BsDashCircle style={{ color: "rgb(181 52 52)" }} size={20} />
            </button>
          )}
        </div>
        <div className="options__container">
          <div className="options__panel options__panel_side_right">
            <Dropdown
              list={sizes}
              name="size"
              label="מידה"
              formValues={subItem.size}
              handleChange={(e) => handleUpdateSubitem(e, itemId, subItemId)}
            />
          </div>
          <div className="options__panel options__panel_side_right">
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
        </div>
      </section>
      {subItemId == subItems[subItems.length - 1].subItemId ? (
        <div className="add_subItem_btn_container">
          {/* <span className="add_size_btn">הוסף מידות/צבעים</span> */}
          <button
            type="button"
            className="form__sub-item-btn form__sub-item-btn_type_add"
            onClick={(e) => {
              e.preventDefault();
              handleAddSubItem(itemId);
            }}
          >
            הוסף מידות/צבעים
            <BsPlusCircle style={{ color: "#19448b" }} size={20} />
          </button>
        </div>
      ) : null}
    </>
  );
};

export default CustomOptions;
