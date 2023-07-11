import React, { useEffect, useState } from 'react';
import ToggleButtons from './ToggleButtons';
import AntDropzone from './AntDropzone';
import CategoryPicker from './CategoryPicker';
import { useForm } from '../contexts/FormContext';
import Input from './Input';
import CustomOptions from './CustomOptions';

const ProductDetails = ({ id }) => {
  // const [itemTotalCount, setItemTotalCount] = useState(0);
  const { items, handleItemsChange } = useForm();
  const item = items.filter((item) => id == item?.id)[0];
  const { itemCount, category, subItems } = item;
  //item is undefined when the page is first loaded so we need to check if it exists
  const checkIfCategory = () => {
    return item && category != undefined && category != '';
  };
  function handleTotalCount(e) {
    // setItemTotalCount(e.target.value);
    handleItemsChange(e, id);
  }

  function calculateRemainingQty(itemId) {
    // Number(items.find((el) => el.id == id).itemCount) - subItemCount
    // "reduce all the subItemCount quantites to one number"
    const subCount = subItems.reduce(
      (accumulator, next) => accumulator + +next.subItemCount,
      0
    );
    //return item's itemCount - reduced aggregate
    return itemCount - subCount;
  }

  const computedQty = calculateRemainingQty(id);

  function handleCheckCustomOptions() {
    let filled = true;

    subItems.forEach((subItem) => {
      filled =
        subItem.size &&
        subItem.color &&
        subItem.subItemCount &&
        subItem.size != '' &&
        subItem.color != '' &&
        subItem.subItemCount != '';
    });
    const bool = filled && calculateRemainingQty(id) == 0 ? true : false;
    console.log(bool);
    return bool;
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
              formValues={itemCount}
            />
          </div>
        </>
      )}
      {/* show the custom options section if there is a count */}
      {item &&
        itemCount != undefined &&
        itemCount != '' &&
        category != 'כובעים' &&
        subItems.map((el) => (
          <CustomOptions
            itemId={id}
            subItemId={el.subItemId}
            itemCount={itemCount}
            key={el.subItemId}
            subItem={el}
          />
        ))}

      {handleCheckCustomOptions() ? <AntDropzone /> : null}

      {category != 'כובעים' && (
        <div className="form__amount-message">
          {computedQty > 0 ? (
            <span>נשארו {computedQty} מוצרים לבחירה</span>
          ) : computedQty < 0 && itemCount != '' ? (
            <span className="form__amount-message form__amount-message_type_error">
              עברת את הכמות הכוללת של מוצר זה
            </span>
          ) : null}
        </div>
      )}
    </section>
  );
};

export default ProductDetails;
