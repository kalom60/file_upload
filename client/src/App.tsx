import React, { useEffect, useState } from "react";
import { Button, Table, message, Modal } from "antd";
import type { ColumnsType } from "antd/es/table";
import FileUpload from "./components/FileUpload";
import Action from "./components/Action";
import axios from "axios";

interface DataType {
  id: string;
  fileName: string;
  key: React.Key;
}

const App: React.FC = () => {
  const [files, setFiles] = useState<any>([]);
  const [attach, setAttach] = useState<boolean>(false);

  function bytesToSize(bytes: any) {
    var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes == 0) return "n/a";
    var i = Math.floor(Math.log(parseInt(bytes)) / Math.log(1024));
    if (i == 0) return bytes + " " + sizes[i];
    return (bytes / Math.pow(1024, i)).toFixed(1) + " " + sizes[i];
  }

  const fetchData = async () => {
    await axios({
      method: "GET",
      url: "http://localhost:5000/file",
    })
      .then((res) => {
        res.data.map((file: any) => {
          file.key = file.id;
          file.createdAt = new Date(file.createdAt).toDateString();
          file.fileSize = bytesToSize(file.fileSize);
        });
        setFiles(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns: ColumnsType<DataType> = [
    {
      title: "File Name",
      dataIndex: "fileName",
    },
    {
      title: "File Size",
      dataIndex: "fileSize",
    },
    {
      title: "Uploaded Date",
      dataIndex: "createdAt",
    },
    {
      title: "Action",
      dataIndex: "",
      render: (text, props) => {
        return (
          <Action
            fetchData={fetchData}
            fileName={props.fileName}
            itemId={props.id}
          />
        );
      },
    },
  ];

  return (
    <div className="container-fluid p-0">
      <div className="mt-5 form-group">
        <Button type="primary" onClick={() => setAttach(true)}>
          upload
        </Button>
      </div>

      <Table columns={columns} dataSource={files} size="middle" />

      <Modal
        open={attach}
        onCancel={() => {
          setAttach(false);
        }}
        width={1000}
        title="Upload"
        footer={[]}
        destroyOnClose={true}
      >
        <FileUpload fetchData={fetchData} />
      </Modal>
    </div>
  );
};

export default App;
