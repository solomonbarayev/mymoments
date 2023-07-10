import React, { useEffect, useState } from "react";
import ToggleButtons from "./ToggleButtons";
import AntDropzone from "./AntDropzone";
import CategoryPicker from "./CategoryPicker";
import { useForm } from "../contexts/FormContext";
import Input from "./Input";
import CustomOptions from "./CustomOptions";

const ProductDetails = ({ id }) => {
  // const [itemTotalCount, setItemTotalCount] = useState(0);
  const [subItemCount, setSubItemCount] = useState(0);
  const { items, handleItemsChange } = useForm();
  const item = items.filter((item) => id == item?.id)[0];
  //item is undefined when the page is first loaded so we need to check if it exists
  const checkIfCategory = () => {
    return item && item.category != undefined && item.category != "";
  };
  function handleTotalCount(e) {
    // setItemTotalCount(e.target.value);
    handleItemsChange(e, id);
  }

  useEffect(() => {
    let subCount = 0;
    items.forEach((item) => {
      item.subItems.forEach((subItem) => {
        subCount += Number(subItem.subItemCount);
      });
    });
    setSubItemCount(subCount);
  }, [JSON.stringify(items)]);

  function calculateRemainingQty(itemId) {
    // Number(items.find((el) => el.id == id).itemCount) - subItemCount
    const itemTotalCount = item.itemCount;
    // "reduce all the subItemCount quantites to one number"
    const subCount = item.subItems.reduce(
      (accumulator, next) => accumulator + +next.subItemCount,
      0
    );
    //return item's itemCount - reduced aggregate
    return itemTotalCount - subCount;
  }

  return (
    <section className="form__print-container">
      <span className="pick_category_text">בחר את המוצר שברצונך להזמין</span>
      <CategoryPicker id={id} />
      {checkIfCategory() && (
        <>
          <div className="form__count-input">
            <Input
              type="tel"
              label="ציין את הכמות הרצויה"
              name="itemCount"
              handleChange={(e) => handleTotalCount(e)}
              formValues={item.itemCount}
            />
          </div>
          {item.category != "כובעים" && (
            <div className="form__amount-message">
              <span>נשארו {calculateRemainingQty(id)} מוצרים לבחירה</span>
            </div>
          )}
        </>
      )}
      {/* show the custom options section if there is a count */}
      {item &&
        item.itemCount != undefined &&
        item.itemCount != "" &&
        item.category != "כובעים" &&
        item.subItems.map((el) => (
          <CustomOptions
            itemId={id}
            subItemId={el.subItemId}
            itemCount={item.itemCount}
            key={el.subItemId}
            subItem={el}
          />
        ))}
      <>{/* <AntDropzone /> */}</>
    </section>
  );
};

export default ProductDetails;
