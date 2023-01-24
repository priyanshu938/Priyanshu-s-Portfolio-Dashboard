import React from "react";
import Url from "../../../ServerUrl";
import { Modal, Form, Input } from "antd";

export default function AddWorkModal({
  openAddWorkModal,
  setOpenAddWorkModal,
  setIsOpen,
  setSeverity,
  setMessage,
}) {
  const { TextArea } = Input;
  const handleSubmitForm = async (values) => {
    const data = {
      name: values.name,
      image: values.image,
      description: values.description,
      url: values.url,
    };
    try {
      const response = await fetch(`${Url}/works/addWork`, {
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
        setOpenAddWorkModal(!openAddWorkModal);
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
        open={openAddWorkModal}
        onCancel={() => setOpenAddWorkModal(false)}
        okButtonProps={{
          form: "add-work-form",
          key: "submit",
          htmlType: "submit",
        }}
        centered
      >
        <Form
          id="add-work-form"
          onFinish={(values) => {
            handleSubmitForm(values);
          }}
          layout="vertical"
        >
          <Form.Item name="name" label="Name">
            <Input type="text" required />
          </Form.Item>
          <Form.Item name="image" label="Image Url">
            <Input type="url" required />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <TextArea rows={4} type="text" required />
          </Form.Item>
          <Form.Item name="url" label="Url">
            <Input type="url" required />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
