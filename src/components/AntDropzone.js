import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import ToggleButtons from './ToggleButtons';
import { useForm } from '../contexts/FormContext';
import { useValidation } from '../contexts/FormValidation';
import Dropdown from './Dropdown';
import { printSizes, printTypes } from '../constants/constants';
import RadioGroup from './RadioGroup';
import { useEffect } from 'react';

const { Dragger } = Upload;
const props = {
  name: 'file',
  // multiple: false,
  // action: "#",
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

function AntDropzone({ itemId, type, typeNum, subType, category }) {
  const { handleFileUpload } = useForm();
  const { itemErrors } = useValidation();
  return (
    <div className="form__file-uploader">
      <Dragger
        {...props}
        maxCount={1}
        onChange={(info) => {
          const { status } = info.file;
          if (status !== 'uploading') {
            var reader = new FileReader();
            reader.readAsDataURL(info.file.originFileObj);
            reader.onload = function () {
              handleFileUpload({
                itemId,
                base64: reader.result,
                type: typeNum,
                subType,
                category,
              });

              // message.success(`${info.file.name} קובץ הועלה בהצלחה `);
            };
          }
          if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
          } else if (status === 'error') {
            // message.error(`${info.file.name} file upload failed.`);
          } else if (status === 'removed') {
            // handleFileUpload(itemId, null, typeNum, subType);
            setTimeout(
              () =>
                handleFileUpload({
                  itemId,
                  base64: null,
                  type: typeNum,
                  subType,
                }),
              300
            );
          }
        }}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          {type}
          <br></br>
          לחץ לבחירת תמונת ההדפסה או גרור את התמונה
        </p>
      </Dragger>
      {itemErrors[itemId] && itemErrors[itemId].fileUploaded ? (
        <span className="form__item-error">
          {itemErrors[itemId].fileUploaded}
        </span>
      ) : null}
      <RadioGroup
        itemId={itemId}
        type={type}
        typeNum={typeNum}
        subType={subType}
        category={category}
      />
    </div>
  );
}

export default AntDropzone;
