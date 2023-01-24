import React from "react";
import Url from "../../../ServerUrl";
import { Modal, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";

export default function AddVideoModal({
  openAddVideoModal,
  setOpenAddVideoModal,
  setIsOpen,
  setSeverity,
  setMessage,
}) {
  const handleSubmitForm = async (values) => {
    const data = {
      title: values.title,
      description: values.description,
      link: values.link,
    };
    try {
      const response = await fetch(`${Url}/videos/addVideo`, {
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
        setOpenAddVideoModal(!openAddVideoModal);
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
        open={openAddVideoModal}
        onCancel={() => setOpenAddVideoModal(false)}
        okButtonProps={{
          form: "add-video-form",
          key: "submit",
          htmlType: "submit",
        }}
        centered
      >
        <Form
          id="add-video-form"
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
