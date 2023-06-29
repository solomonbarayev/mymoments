import React from "react";
import ToggleButtons from "./ToggleButtons";
import AntDropzone from "./AntDropzone";
import CategoryPicker from "./CategoryPicker";

const ProductDetails = () => {
  return (
    <section className="form__print-container">
      <CategoryPicker />
      <>
        <AntDropzone />
      </>

      {/* <section
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
                      <Dropdown
                        list={colors}
                        name="color"
                        label="צבע"
                        formValues={itemValues[i]?.color}
                        handleChange={(event) => handleItemsChange(event, el)}
                      />
                      <Dropdown
                        list={sizes}
                        name="size"
                        label="מידה"
                        formValues={itemValues[i]?.size}
                        handleChange={(event) => handleItemsChange(event, el)}
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
                </section> */}
    </section>
  );
};

export default ProductDetails;
