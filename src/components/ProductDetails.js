import React from "react";
import ToggleButtons from "./ToggleButtons";
import AntDropzone from "./AntDropzone";
import CategoryPicker from "./CategoryPicker";
import { useForm } from "../contexts/FormContext";
import Input from "./Input";
import CustomOptions from "./CustomOptions";

const ProductDetails = ({ id }) => {
  const { items, handleItemsChange } = useForm();
  console.log(id);
  const item = items.filter((el) => el.id == id)[0];
  console.log(item);
  const checkIfCategory = () => {
    return item && item.category != undefined && item.category != "";
  };

  return (
    <section className="form__print-container">
      <span className="pick_category_text">בחר את המוצר שברצונך להזמין</span>
      <CategoryPicker id={id} />
      {checkIfCategory() && (
        <div className="form__count-input">
          <Input
            type="tel"
            label="ציין את הכמות הרצויה"
            name="itemCount"
            handleChange={(e) => handleItemsChange(e, id)}
          />
        </div>
      )}
      {/* show the custom options section if there is a count */}
      {item &&
        item.itemCount != undefined &&
        item.itemCount != "" &&
        item.category != "כובעים" &&
        item.subItems.map((el) => {
          return (
            <CustomOptions
              id={id}
              subItemId={el.subItemId}
              itemCount={item.itemCount}
              key={el.subItemId}
            />
          );
        })}
      <>{/* <AntDropzone /> */}</>
    </section>
  );
};

export default ProductDetails;
