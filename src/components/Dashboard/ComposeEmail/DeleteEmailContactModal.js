import React from "react";
import Url from "../../../ServerUrl";
import { Modal, Table, Button } from "antd";

const DeleteEmailContactModal = ({
  openDeleteEmailContactModal,
  setDeleteEmailContactModal,
  mailContacts,
  setIsOpen,
  setSeverity,
  setMessage,
}) => {
  const deleteMailContactFromServer = async (_id) => {
    try {
      const response = await fetch(
        `${Url}/emailViaForm/deleteEmailContact/${_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": window.localStorage.getItem("token"),
          },
        }
      );
      const json = await response.json();
      if (response.status === 200) {
        setIsOpen(true);
        setSeverity("success");
        setMessage(json.message);
        setDeleteEmailContactModal(!openDeleteEmailContactModal);
      } else {
        setIsOpen(true);
        setSeverity("error");
        setMessage("Something went wrong!");
      }
    } catch (error) {
      setIsOpen(true);
      setSeverity("error");
      setMessage("Internal Server Error!");
    }
  };
  return (
    <Modal
    title="Delete email contact"
      open={openDeleteEmailContactModal}
      onCancel={() => setDeleteEmailContactModal(false)}
      onOk={() => setDeleteEmailContactModal(false)}
      footer={null}
      centered
    >
      <Table
        dataSource={mailContacts}
        columns={[
          {
            key: "email",
            title: "Email Id",
            dataIndex: "email",
          },
          {
            title: "Actions",
            render: (value) => (
              <Button
                type="primary"
                danger
                onClick={() => {
                  deleteMailContactFromServer(value._id);
                }}
              >
                Delete
              </Button>
            ),
          },
        ]}
      />
    </Modal>
  );
};

export default DeleteEmailContactModal;