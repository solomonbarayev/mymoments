import React, { useEffect, useState } from "react";
import ToggleButtons from "./ToggleButtons";
import AntDropzone from "./AntDropzone";
import CategoryPicker from "./CategoryPicker";
import { useForm } from "../contexts/FormContext";
import Input from "./Input";
import CustomOptions from "./CustomOptions";
import AntDTextArea from "./AntDTextArea";
import { useValidation } from "../contexts/FormValidation.js";

const ProductDetails = ({ id }) => {
  const { errors, itemErrors } = useValidation();
  // const [itemTotalCount, setItemTotalCount] = useState(0);
  const { items, handleItemsChange, handleCustomText } = useForm();
  const item = items.filter((item) => id == item?.id)[0];
  const { itemCount, category, subItems, typeOfPrint } = item;
  //item is undefined when the page is first loaded so we need to check if it exists
  const checkIfCategory = () => {
    return item && category != undefined && category != "";
  };

  const checkIftypeOfPrint = () => {
    if (item) {
      if (typeOfPrint == "front") return 1;
      else if (typeOfPrint == "back") return 2;
      else if (typeOfPrint == "doubleSided") return 3;
      else if (typeOfPrint == "exclude") return 4;
    }
  };

  function twoAntDropzone(id) {
    return (
      <div className="form__two_antdropzone">
        <AntDropzone
          category={item.category}
          itemId={id}
          type="הדפס קידמי"
          subType="front"
          typeNum={checkIftypeOfPrint()}
        />
        <AntDropzone
          category={item.category}
          itemId={id}
          type="הדפס אחורי"
          subType="back"
          typeNum={checkIftypeOfPrint()}
        />
      </div>
    );
  }

  function handleNoPrintText(text) {
    handleCustomText(text, id);
  }

  function ifNoPrint() {
    return (
      <div>
        {category != "כובעים" ? (
          <p>
            אם אתם מעוניינים בהדפס בהתאמה אישית אנא רשמו כאן את המשפט שאתם רוצים
            להדפיס. יש לציין בפירוט את גודל ההדפס (הדפס כיס: 8 סמ או הדפס גדול
            A4 ) ואת צדדי ההדפס.
          </p>
        ) : (
          <p>
            אם אתם מעוניינים בהדפס בהתאמה אישית אנא רשמו כאן את המשפט שאתם רוצים
            שימו לב שההדפס יהיה בצד הקדמי של הכובע
          </p>
        )}
        <AntDTextArea
          itemId={id}
          handleChange={handleNoPrintText}
          category={item.category}
        />
      </div>
    );
  }

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
  const getTypeOfPrint = () => {
    return typeOfPrint == "front" ? "הדפס קידמי" : "הדפס אחורי";
  };
  function handleCheckCustomOptions() {
    let filled = true;

    subItems.forEach((subItem) => {
      filled =
        subItem.size &&
        subItem.color &&
        subItem.subItemCount &&
        subItem.size != "" &&
        subItem.color != "" &&
        subItem.subItemCount != "";
    });
    const bool = filled && calculateRemainingQty(id) == 0 ? true : false;
    console.log(bool);
    return bool;
  }

  return (
    <section className="form__print-container">
      <span className="form__subtitle form__categories-title">
        בחר את המוצר שברצונך להזמין
      </span>
      <CategoryPicker id={id} />
      {checkIfCategory() ? (
        <ToggleButtons itemId={id} category={item.category} />
      ) : null}
      {checkIftypeOfPrint() == 1 && (
        <AntDropzone
          itemId={id}
          type={getTypeOfPrint()}
          typeNum={checkIftypeOfPrint()}
          category={item.category}
        />
      )}
      {checkIftypeOfPrint() == 2 && (
        <AntDropzone
          category={item.category}
          itemId={id}
          type={getTypeOfPrint()}
          typeNum={checkIftypeOfPrint()}
        />
      )}
      {checkIftypeOfPrint() == 3 && twoAntDropzone(id)}
      {checkIftypeOfPrint() == 4 && ifNoPrint()}

      {item.fileUploaded && (
        <>
          <div className="form__count-input">
            <Input
              type="tel"
              label="ציין את הכמות הרצויה"
              name="itemCount"
              handleChange={(e) => handleTotalCount(e, id)}
              formValues={itemCount}
              validationMessage={itemErrors[id]?.itemCount}
            />
          </div>
        </>
      )}
      {/* show the custom options section if there is a count */}
      {item &&
        itemCount != undefined &&
        itemCount != "" &&
        category != "כובעים" &&
        item.fileUploaded &&
        subItems.map((el) => (
          <CustomOptions
            itemId={id}
            subItemId={el.subItemId}
            itemCount={itemCount}
            key={el.subItemId}
            subItem={el}
          />
        ))}
      {category != "כובעים" && (
        <div className="form__amount-message">
          {computedQty > 0 ? (
            <span>נשארו {computedQty} מוצרים לבחירה</span>
          ) : computedQty < 0 && itemCount != "" ? (
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
