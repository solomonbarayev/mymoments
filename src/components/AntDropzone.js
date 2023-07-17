import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import ToggleButtons from './ToggleButtons';
import { useForm } from '../contexts/FormContext';
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

function AntDropzone({ itemId, type, typeNum, subType }) {
  const { handleFileUpload } = useForm();

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
              handleFileUpload(itemId, reader.result, typeNum, subType);
            };
          } else if (status === 'removed') {
            setTimeout(
              () => handleFileUpload(itemId, null, typeNum, subType),
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
      <RadioGroup
        itemId={itemId}
        type={type}
        typeNum={typeNum}
        subType={subType}
      />
    </div>
  );
}

export default AntDropzone;
