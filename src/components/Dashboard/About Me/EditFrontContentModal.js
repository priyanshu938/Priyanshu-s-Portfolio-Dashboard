import React, { useState } from "react";
import { Modal, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import url from "../../../ServerUrl";

const EditFrontContentModal = ({
  openEditFrontContentModal,
  setOpenEditFrontContentModal,
  setIsOpenSnackbar,
  setSeverity,
  setMessage,
  id,
  image,
  description,
  link,
}) => {
  const [fields, setFields] = useState([
    {
      name: ["image"],
      value: image,
    },
    {
      name: ["description"],
      value: description,
    },
    {
      name: ["link"],
      value: link,
    },
  ]);

  const handleSubmitForm = async (values) => {
    const data = {
      image: values.image,
      description: values.description,
      link: values.link,
    };
    try {
      const response = await fetch(`${url}/resume/editResume/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "auth-token": window.localStorage.getItem("token"),
        },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      if (response.status === 200) {
        setIsOpenSnackbar(true);
        setSeverity("success");
        setMessage(json.message);
        setOpenEditFrontContentModal(!openEditFrontContentModal);
      }
    } catch (error) {
      setIsOpenSnackbar(true);
      setSeverity("error");
      setMessage("Internal Server Error!");
    }
  };
  return (
    <div>
      <Modal
        open={openEditFrontContentModal}
        onCancel={() => setOpenEditFrontContentModal(false)}
        okButtonProps={{
          form: "edit-front-content-form",
          key: "submit",
          htmlType: "submit",
        }}
        centered
      >
        <Form
          id="edit-front-content-form"
          fields={fields}
          onFieldsChange={(_, allFields) => {
            setFields(allFields);
          }}
          onFinish={(values) => {
            handleSubmitForm(values);
          }}
          layout="vertical"
        >
          <Form.Item label="Name">
            <Input defaultValue="Hello, I am Priyanshu Tiwari" disabled />
          </Form.Item>
          <Form.Item name="image" label="Image Url">
            <Input type="url" required />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <TextArea rows={4} type="text" required />
          </Form.Item>
          <Form.Item name="link" label="Url">
            <Input type="url" required />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EditFrontContentModal;
