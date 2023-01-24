import React, { useState } from "react";
import Url from "../../../ServerUrl";
import { Modal, Form, Input } from "antd";

export default function EditCertificateModal({
  openEditCertificateModal,
  setOpenEditCertificateModal,
  setIsOpen,
  setSeverity,
  setMessage,
  id,
  name,
  image,
  description,
  link,
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
      name: ["link"],
      value: link,
    },
  ]);
  const handleSubmitForm = async (values) => {
    const data = {
      name: values.name,
      image: values.image,
      description: values.description,
      link: values.link,
    };
    try {
      const response = await fetch(
        `${Url}/certificates/editCertificate/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "auth-token": window.localStorage.getItem("token"),
          },
          body: JSON.stringify(data),
        }
      );
      const json = await response.json();
      if (response.status === 200) {
        setIsOpen(true);
        setSeverity("success");
        setMessage(json.message);
        setOpenEditCertificateModal(!openEditCertificateModal);
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
        open={openEditCertificateModal}
        onCancel={() => setOpenEditCertificateModal(false)}
        okButtonProps={{
          form: "edit-certificate-form",
          key: "submit",
          htmlType: "submit",
        }}
        centered
      >
        <Form
          id="edit-certificate-form"
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
          <Form.Item name="link" label="Url">
            <Input type="url" required />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
