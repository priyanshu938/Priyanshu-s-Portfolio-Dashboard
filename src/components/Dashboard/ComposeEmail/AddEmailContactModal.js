import React from "react";
import Url from "../../../ServerUrl";
import { Modal, Form, Input } from "antd";

export default function AddEmailContactModal({
  openAddEmailContactModal,
  setAddEmailContactModal,
  setIsOpen,
  setSeverity,
  setMessage,
}) {
  const handleSubmitForm = async (values) => {
    const data = {
      email: values.email,
    };
    try {
      const response = await fetch(`${Url}/emailViaForm/addEmailContact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": window.localStorage.getItem("token"),
        },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      if (response.status === 201) {
        setIsOpen(true);
        setSeverity("success");
        setMessage(json.message);
        setAddEmailContactModal(!openAddEmailContactModal);
      } else {
        setIsOpen(true);
        setSeverity("error");
        setMessage("This email id already exists!");
      }
    } catch (error) {
      setIsOpen(true);
      setSeverity("error");
      setMessage("Internal Server Error!");
    }
  };

  return (
    <div>
      <Modal
        open={openAddEmailContactModal}
        onCancel={() => setAddEmailContactModal(false)}
        okButtonProps={{
          form: "add-email-form",
          key: "submit",
          htmlType: "submit",
        }}
        centered
      >
        <Form
          id="add-email-form"
          onFinish={(values) => {
            handleSubmitForm(values);
          }}
          layout="vertical"
        >
          <Form.Item name="email" label="Add Email">
            <Input type="email" placeholder="abc@email.com" required />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
