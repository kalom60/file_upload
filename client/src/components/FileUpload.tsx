import React from "react";
import { message, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
const { Dragger } = Upload;

const FileUpload: React.FC = (props: any) => {
  const prop: UploadProps = {
    name: "file",
    multiple: true,
    action: "http://localhost:5000/file",
    beforeUpload(file: any, filesArray: any) {
      return new Promise((resolve, reject) => {
        // check the file size - you can specify the file size you'd like here:
        const isLt10M = file.size / 1024 / 1024 <= 10;
        if (!isLt10M) {
          message.error(`${file.name} is greater than 10MB.`);
          reject(false);
        }

        if (file) console.log("before");
        let reader = new FileReader();
        reader.onload = (e) => {
          if (e.target) {
            let data = e.target.result;
            file.data = data;
            console.log(file);
          }
        };
        reader.readAsText(file);
        resolve(true);
      });
    },
    onChange(info: any) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        props.fetchData();
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <Dragger {...prop}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        Click or drag file to this area to upload
      </p>
      <p className="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibited from uploading
        company data or other banned files.
      </p>
    </Dragger>
  );
};

export default FileUpload;
