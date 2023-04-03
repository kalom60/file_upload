import React from "react";
import { Button, Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import axios from "axios";

const { confirm } = Modal;

type Props = {
  fetchData: Function;
  fileName: string;
  itemId: string;
};

const Action = (props: Props) => {
  const { fetchData, fileName, itemId } = props;

  const showDeleteConfirm = () => {
    confirm({
      title: `Are you sure delete ${fileName}?`,
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      async onOk() {
        await axios({
          method: "DELETE",
          url: "http://localhost:5000/file",
          params: { id: itemId },
        })
          .then(() => {
            fetchData();
          })
          .catch((err) => console.log(err));
      },
      onCancel() {
        // console.log('Cancel');
      },
    });
  };

  return (
    <div>
      <Button onClick={showDeleteConfirm} type="dashed" danger>
        Delete
      </Button>
    </div>
  );
};

export default Action;
