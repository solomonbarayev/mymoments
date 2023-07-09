import React, { useState } from 'react';
import Dropdown from './Dropdown';
import { data } from '../data/data';
import { useForm } from '../contexts/FormContext';
import Input from './Input';
import { BsDashCircleFill } from 'react-icons/bs';

const colors = data.colors;
const sizes = data.sizes;

const CustomOptions = ({
  itemCount,
  id,
  subItemId,
  subItemCount,
  setSubItemCount,
}) => {
  const useColors = itemCount > 10 ? colors : ['שחור', 'לבן'];
  const { items, handleUpdateSubitem } = useForm();
  const item = items.filter((item) => id == item.id)[0];
  const subItems = item.subItems;
  const subItemIds = subItems.map((el) => el.subItemId);

  function handleSubItemCount(e, subId) {
    // subItemCount = e.target.value;
    // setSubItemCount = subItemCount;
    setSubItemCount(Number(e.target.value) + subItemCount);
    handleUpdateSubitem(e, id, subId);
  }

  return (
    <>
      {subItemIds.map((subId) => (
        <section className="options" key={subId}>
          <div className="options__panel_delete_button">
            <button type="button" className="form__remove-item-btn">
              <BsDashCircleFill />
            </button>
          </div>
          <div className="options__panel options__panel_side_right">
            <Dropdown
              list={sizes}
              name="size"
              label="מידה"
              formValues={
                subItems.filter((el) => el.subItemId == subId)[0]?.size
              }
              handleChange={(e) => handleUpdateSubitem(e, subId)}
            />
          </div>
          <div className="options__panel options__panel_side_center">
            <Input
              type="tel"
              label="כמות המידה הרצויה"
              name="sizeCount"
              handleChange={(e) => handleSubItemCount(e, subId)}
            />
          </div>
          <div className="options__panel options__panel_side_left">
            <Dropdown
              list={useColors}
              name="color"
              label="צבע"
              formValues={
                subItems.filter((el) => el.subItemId == subId)[0]?.color
              }
              handleChange={(e) => handleUpdateSubitem(e, id, subId)}
            />
          </div>
        </section>
      ))}
    </>
  );
};

export default CustomOptions;
