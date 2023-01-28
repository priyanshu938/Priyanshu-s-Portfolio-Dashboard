import React from "react";
import Url from "../../../ServerUrl";
import { Modal, Form, Input } from "antd";

export default function AddCertificateModal({
  openAddCertificateModal,
  setOpenAddCertificateModal,
  setIsOpen,
  setSeverity,
  setMessage,
  callUseEffect,
  setCallUseEffect,
}) {
  const { TextArea } = Input;
  const handleSubmitForm = async (values) => {
    const data = {
      name: values.name,
      image: values.image,
      description: values.description,
      link: values.link,
    };
    try {
      const response = await fetch(`${Url}/certificates/addCertificate`, {
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
        setOpenAddCertificateModal(!openAddCertificateModal);
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
        open={openAddCertificateModal}
        onCancel={() => setOpenAddCertificateModal(false)}
        okButtonProps={{
          form: "add-certificate-form",
          key: "submit",
          htmlType: "submit",
        }}
        centered
      >
        <Form
          id="add-certificate-form"
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
          <Form.Item name="link" label="Url">
            <Input type="url" required />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
