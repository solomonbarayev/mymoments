import React, { useState, useEffect } from "react";
import { data } from "../data/data.js";
import Input from "./Input.js";
import { BsFillTrash3Fill } from "react-icons/bs";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ProductDetails from "./ProductDetails.js";
import { useForm } from "../contexts/FormContext.js";
import { useValidation } from "../contexts/FormValidation.js";
import AntDTextArea from "./AntDTextArea";
let { categories: cats, colors: cols, sizes: siz } = data;
cats = cats.map((cat) => cat.name);

const Form = () => {
  const [showAddress, setShowAddress] = useState(false);
  const { errors, itemErrors, subItemErrors } = useValidation();

  const {
    itemValues,
    customerValues,
    handleCustomerChange,
    itemsIds,
    addItem,
    removeItem,
    handleShippingChange,
    handleUpdateOrderNotes,
  } = useForm();
  const [expanded, setExpanded] = useState(itemsIds[0]);

  const addItemAndExpand = () => {
    addItem();
  };

  useEffect(() => {
    setExpanded(itemsIds[itemsIds.length - 1]);
  }, [itemValues.length]);

  const removeAndExpandPrev = (el) => {
    console.log(el);
    removeItem(el);
    setExpanded(el);
  };

  const [index, setIndex] = useState(0);

  useEffect(() => {
    //scroll into view the item with the id ==expanded
    if (index != 0) {
      const element = document.getElementById(expanded);
      console.log(element);
      //screen is less than 600px
      if (window.innerWidth < 600) {
        setTimeout(
          () => element?.scrollIntoView({ behavior: "smooth", block: "start" }),
          300
        );
      } else {
        setTimeout(
          () =>
            element?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            }),
          300
        );
      }
    }
    setIndex(index + 1);
  }, [expanded]);

  function checkCategoryForEach() {
    return itemValues.every(
      (item) => item.category != undefined && item.category != ""
    );
  }

  function checkTypeOfPrintForEach() {
    return itemValues.every(
      (item) => item.typeOfPrint != undefined && item.typeOfPrint != ""
    );
  }

  function checkAllSubItemSizeAndColor() {
    //if there is an error, then add error with proper key name to subItemErrors object
    return itemValues.every((item) =>
      item.subItems.every(
        (subItem) =>
          subItem.size != undefined &&
          subItem.size != "" &&
          subItem.color != undefined &&
          subItem.color != ""
      )
    );
  }

  function checkThatPrintHasSizeSelected() {
    return itemValues.every((item) => {
      if (item.typeOfPrint == "exclude") return true;
      else {
        const front = item.prints.frontPrint;
        const back = item.prints.backPrint;
        let result = false;
        if (front.file !== "") {
          result = front.printSize !== "";
        }
        if (back.file !== "") {
          result = back.printSize !== "";
        }
        return result;
      }
    });
  }

  function checkErrorsObjEmpty(errObj) {
    return Object.every((key) => errObj[key] == "" || errObj[key] == undefined);
  }

  function handleSubmit(e) {
    e.preventDefault();

    //check all the items have a category
    checkCategoryForEach();
    //check all the items have a typeOfPrint
    checkTypeOfPrintForEach();
    //check all the item have a size selected from radio buttons
    checkThatPrintHasSizeSelected();
    //check the itemErrors object is empty
    checkErrorsObjEmpty(itemErrors);
    //check that subItems have a size and color
    checkAllSubItemSizeAndColor();
    //if not then add error to subItemErrors object (refactor function to do this)
    //check the subItemErrors object is empty
    checkErrorsObjEmpty(subItemErrors);
    //check the errors object is empty
    checkErrorsObjEmpty(errors);
    //if all the above are true, then submit the form (fetch to server)
    console.log("submitted");
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <section className="form__section form__section_type_customer">
        <h2 className="form__title form__subtitle">פרטי לקוח</h2>
        <div className="form__group form__group_type_customer">
          <Input
            name="fullName"
            label="שם מלא"
            formValues={customerValues.fullName}
            handleChange={handleCustomerChange}
            validationMessage={errors.fullName}
          />
          <Input
            name="phone"
            maxLength={9}
            label="טלפון"
            formValues={customerValues.phone}
            handleChange={handleCustomerChange}
            validationMessage={errors.phone}
          />
          <div className="form__checkbox">
            <label id="show-address">
              האם אתם מעוניינים במשלוח? (המשלוח בתשלום)
            </label>
            <input
              type="checkbox"
              value={showAddress}
              htmlFor="show-address"
              onChange={(e) => {
                setShowAddress(!showAddress);
                handleShippingChange(!showAddress);
              }}
            />
          </div>
          {showAddress && (
            <>
              <Input
                name="city"
                label="עיר מגורים"
                formValues={customerValues.city}
                handleChange={handleCustomerChange}
                validationMessage={errors.city}
              />
              <Input
                name="address"
                label="כתובת למשלוח"
                formValues={customerValues.address}
                handleChange={handleCustomerChange}
                validationMessage={errors.address}
              />
            </>
          )}
        </div>
      </section>
      <div className="form__products-container">
        {itemsIds.map((el, i) => (
          <div className="form__accordion" id={el} key={el}>
            <Accordion
              sx={{
                boxShadow: "none",
              }}
              expanded={expanded == el}
              onClick={() => setExpanded(el)}
            >
              <AccordionSummary
                // expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{
                  cursor: "pointer",
                  width: "100%",
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  alignContent: "center",
                }}
              >
                <Typography
                  sx={{
                    // marginLeft: "auto",
                    fontSize: "1.1em",
                    fontWeight: "bold",
                    padding: "0 30px",
                    lineHeight: "1.7em",
                    flexGrow: 1,
                    textAlign: "left",
                  }}
                  className="form__subtitle"
                >
                  פריט {i + 1}
                </Typography>
                {itemsIds.length == 1 ? null : (
                  <button
                    type="button"
                    className="form__remove-item-btn"
                    onClick={() => removeAndExpandPrev(el)}
                  >
                    <BsFillTrash3Fill />
                  </button>
                )}
              </AccordionSummary>

              <AccordionDetails>
                <ProductDetails id={el} />
              </AccordionDetails>
            </Accordion>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="btn btn-primary form__add-btn"
        onClick={() => addItemAndExpand()}
      >
        הוסף פריט <AiOutlinePlusCircle />
      </button>

      <div className="form__notes-container">
        <label htmlFor="notes" className="form__subtitle">
          {" "}
          הערות להזמנה
        </label>
        <AntDTextArea id="notes" handleChange={handleUpdateOrderNotes} />
      </div>
      <button className="btn btn-primary form__send-btn" type="submit">
        שלח הזמנה
      </button>
    </form>
  );
};

export default Form;
