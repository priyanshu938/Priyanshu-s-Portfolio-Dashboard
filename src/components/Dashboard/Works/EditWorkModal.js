import React, { useState } from "react";
import Url from "../../../ServerUrl";
import { Modal, Form, Input } from "antd";

export default function EditWorkModal({
  openEditWorkModal,
  setOpenEditWorkModal,
  setIsOpen,
  setSeverity,
  setMessage,
  id,
  name,
  image,
  description,
  url,
}) {
  const { TextArea } = Input;
  const [fields, setFields] = useState([
    {
      name: ["name"],
      value: name,
    },
    {
      name: ["image"],
      value: image,
    },
    {
      name: ["description"],
      value: description,
    },
    {
      name: ["url"],
      value: url,
    },
  ]);
  const handleSubmitForm = async (values) => {
    const data = {
      name: values.name,
      image: values.image,
      description: values.description,
      url: values.url,
    };
    try {
      const response = await fetch(`${Url}/works/editWork/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "auth-token": window.localStorage.getItem("token"),
        },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      if (response.status === 200) {
        setIsOpen(true);
        setSeverity("success");
        setMessage(json.message);
        setOpenEditWorkModal(!openEditWorkModal);
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
        open={openEditWorkModal}
        onCancel={() => setOpenEditWorkModal(false)}
        okButtonProps={{
          form: "edit-work-form",
          key: "submit",
          htmlType: "submit",
        }}
        centered
      >
        <Form
          id="edit-work-form"
          fields={fields}
          onFieldsChange={(_, allFields) => {
            setFields(allFields);
          }}
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
