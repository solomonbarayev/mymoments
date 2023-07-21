import React, { useState } from 'react';
import { Radio } from 'antd';
import { useForm } from '../contexts/FormContext';
import { useValidation } from '../contexts/FormValidation';

const RadioGroup = ({ itemId, type, typeNum, subType, category }) => {
  const [value, setValue] = useState();

  const { handleFileUpload } = useForm();
  const { itemErrors, handleItemErrors } = useValidation();

  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
    handleFileUpload({
      itemId,
      base64: '',
      type: typeNum,
      subType,
      text: '',
      printSize: e.target.value,
    });

    handleItemErrors(
      {
        target: {
          name: 'printSize',
          value: '',
        },
      },
      itemId
    );
  };
  return (
    <>
      {category != 'כובעים' ? (
        <>
          <Radio.Group onChange={onChange} value={value}>
            <Radio value={1}>סמל קטן (בגודל הכיס)</Radio>
            <Radio value={2}>סמל גדול (בגודל A4)</Radio>
          </Radio.Group>
          {itemErrors[itemId]?.printSize && (
            <span className="form__item-error">
              {itemErrors[itemId].printSize}
            </span>
          )}
        </>
      ) : null}
    </>
  );
};
export default RadioGroup;
