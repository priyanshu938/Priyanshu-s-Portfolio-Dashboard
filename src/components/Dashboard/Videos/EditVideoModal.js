import React, { useState } from "react";
import Url from "../../../ServerUrl";
import { Modal, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";

export default function EditVideoModal({
  openEditVideoModal,
  setOpenEditVideoModal,
  setIsOpen,
  setSeverity,
  setMessage,
  id,
  title,
  description,
  link,
  callUseEffect,
  setCallUseEffect,
}) {
  const [fields, setFields] = useState([
    {
      name: ["title"],
      value: title,
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
      title: values.title,
      description: values.description,
      link: values.link,
    };
    try {
      const response = await fetch(`${Url}/videos/editVideo/${id}`, {
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
        setOpenEditVideoModal(!openEditVideoModal);
        setCallUseEffect(!callUseEffect);
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
        open={openEditVideoModal}
        onCancel={() => setOpenEditVideoModal(false)}
        okButtonProps={{
          form: "edit-video-form",
          key: "submit",
          htmlType: "submit",
        }}
        centered
      >
        <Form
          id="edit-video-form"
          fields={fields}
          onFieldsChange={(_, allFields) => {
            setFields(allFields);
          }}
          onFinish={(values) => {
            handleSubmitForm(values);
          }}
          layout="vertical"
        >
          <Form.Item name="title" label="Title">
            <Input type="text" required />
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
}
