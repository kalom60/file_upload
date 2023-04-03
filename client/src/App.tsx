import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Table, Modal } from "antd";
import type { ColumnsType } from "antd/es/table";
import "./App.css";

interface DataType {
  id: string;
  fileName: string;
  key: React.Key;
}

const App: React.FC = () => {
  const [files, setFiles] = useState<any>([]);
  const [attach, setAttach] = useState<boolean>(false);

  const fetchData = async () => {
    await axios({
      method: "GET",
      url: "http://localhost:5000/file",
    })
      .then((res) => {
        res.data.map((file: any) => {
          file.key = file.id;
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
  ];

  return (
    <div>
      <div>
        <Button type="primary" onClick={() => setAttach(true)}>
          upload
        </Button>
      </div>

      <Table columns={columns} dataSource={files} size="middle" />
    </div>
  );
};

export default App;
