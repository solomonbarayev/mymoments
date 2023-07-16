import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import ToggleButtons from './ToggleButtons';
import { useForm } from '../contexts/FormContext';
import Dropdown from './Dropdown';
import { printSizes, printTypes } from '../constants/constants';
const { Dragger } = Upload;
const props = {
  name: 'file',
  multiple: true,
  // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

function AntDropzone({ itemId, type, typeNum, subType }) {
  const { handleFileUpload } = useForm();
  console.log(subType);
  console.log(itemId);
  return (
    <>
      <Dragger
        {...props}
        onChange={(info) => {
          const { status } = info.file;
          if (status !== 'uploading') {
            var reader = new FileReader();
            reader.readAsDataURL(info.file.originFileObj);
            reader.onload = function () {
              console.log(reader.result);
              handleFileUpload(itemId, reader.result, typeNum, subType);
            };
          }
          if (status === 'done') {
            // message.success(`${info.file.name} file uploaded successfully.`);
          } else if (status === 'error') {
            // message.error(`${info.file.name} file upload failed.`);
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
    </>
  );
}

export default AntDropzone;
