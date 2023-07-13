import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import ToggleButtons from "./ToggleButtons";
import { useForm } from "../contexts/FormContext";
import Dropdown from "./Dropdown";
import { printSizes, printTypes } from "../constants/constants";
const { Dragger } = Upload;
const props = {
  name: "file",
  multiple: true,
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

function AntDropzone({ itemId, type }) {
  console.log(itemId);
  return (
    <>
      <Dragger {...props}>
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
