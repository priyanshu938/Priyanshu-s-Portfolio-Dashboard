import React, { useState } from "react";
import { Modal, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import url from "../../../ServerUrl";

const EditTestimonialContentModal = ({
  openEditTestimonialContentModal,
  setOpenEditTestimonialContentModal,
  callUseEffect,
  setCallUseEffect,
  setIsOpenSnackbar,
  setSeverity,
  setMessage,
  id,
  description,
  designation,
}) => {
  const [fields, setFields] = useState([
    {
      name: ["description"],
      value: description,
    },
    {
      name: ["designation"],
      value: designation,
    },
  ]);
  const handleSubmitForm = async (values) => {
    const data = {
      description: values.description,
      designation: values.designation,
    };
    try {
      const response = await fetch(`${url}/testimonial/editTestimonial/${id}`, {
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
        setOpenEditTestimonialContentModal(!openEditTestimonialContentModal);
        setCallUseEffect(!callUseEffect);
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
        open={openEditTestimonialContentModal}
        onCancel={() => setOpenEditTestimonialContentModal(false)}
        okButtonProps={{
          form: "edit-testimonial-content-form",
          key: "submit",
          htmlType: "submit",
        }}
        centered
      >
        <Form
          id="edit-testimonial-content-form"
          fields={fields}
          onFieldsChange={(_, allFields) => {
            setFields(allFields);
          }}
          onFinish={(values) => {
            handleSubmitForm(values);
          }}
          layout="vertical"
        >
          <Form.Item name="description" label="Description">
            <TextArea rows={5} type="text" required />
          </Form.Item>
          <Form.Item name="designation" label="Designation">
            <Input type="text" required />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EditTestimonialContentModal;
